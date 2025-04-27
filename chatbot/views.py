import pandas as pd
import io
import pdfplumber
import matplotlib.pyplot as plt
import base64
import openai

from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY  # Ensure this is set in your settings

def home(request):
    table = None
    chart = None
    advice = None
    error = None
    text_input = None

    if request.method == 'POST':
        # Handling File Input
        if request.FILES.get('file'):
            uploaded_file = request.FILES['file']
            file_type = uploaded_file.name.split('.')[-1].lower()

            try:
                if file_type == 'csv':
                    df = pd.read_csv(uploaded_file)
                elif file_type == 'pdf':
                    df = extract_table_from_pdf(uploaded_file)
                else:
                    error = "Unsupported file type. Please upload CSV or PDF."

                if not error:
                    table = df.head(10).to_html(classes='table', index=False)
                    chart = generate_base64_pie_chart(df)
                    advice = generate_financial_advice(df)

            except Exception as e:
                error = f"Error processing file: {str(e)}"
        
        # Handling Text Input
        elif request.POST.get('text_input'):
            text_input = request.POST.get('text_input').strip()
            
            if text_input:  # Check if there's any input
                try:
                    # Call the function to generate advice based on the text input
                    advice = generate_financial_advice_from_text(text_input)
                except Exception as e:
                    error = f"Error processing text input: {str(e)}"
            else:
                error = "Please enter a question."

    return render(request, 'chatbot/index.html', {
        'table': table,
        'chart': chart,
        'advice': advice,
        'text_input': text_input,
        'error': error,
    })


def extract_table_from_pdf(file):
    """
    Extracts the first table from a PDF using pdfplumber
    """
    try:
        with pdfplumber.open(file) as pdf:
            first_page = pdf.pages[0]
            table = first_page.extract_table()
            if table:
                df = pd.DataFrame(table[1:], columns=table[0])
                return df
            else:
                raise ValueError("No table found in the PDF.")
    except Exception as e:
        raise ValueError(f"Error extracting table from PDF: {str(e)}")

    
def generate_base64_pie_chart(df):
    """
    Generates a pie chart image from the DataFrame and returns a base64-encoded string
    """
    import matplotlib.pyplot as plt
    import io
    import base64

    fig, ax = plt.subplots()
    column_to_plot = 'Category' if 'Category' in df.columns else df.columns[0]
    try:
        data_counts = df[column_to_plot].value_counts().head(5)
        ax.pie(data_counts, labels=data_counts.index, autopct='%1.1f%%')
        ax.axis('equal')
        plt.tight_layout()
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        encoded = base64.b64encode(buf.read()).decode('utf-8')
    except Exception as e:
        encoded = None
    finally:
        plt.close(fig)
    return encoded


def generate_financial_advice(df):
    """
    Generates financial advice based on the CSV data provided
    """
    try:
        total_expenses = df['Amount'].sum()
        categories_summary = df.groupby('Category')['Amount'].sum().to_dict()

        prompt = f"""
        Here is the summary of my expenses:

        Total Expenses: {total_expenses} USD

        Category-wise Expenses:
        {categories_summary}

        Based on this, can you provide some personalized savings advice? How can I optimize my spending in different categories to save for a major financial goal, such as buying a house or investing?
        """

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful financial advisor."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.7,
        )

        advice = response.choices[0].message['content'].strip()
        return advice
    except Exception as e:
        raise Exception(f"Error generating financial advice: {str(e)}")


def generate_financial_advice_from_text(text_input):
    import openai

    prompt = f"""
    User question: {text_input}

    Please provide a helpful and detailed financial advice response.
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful financial advisor."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.7,
        )
        advice = response.choices[0].message['content'].strip()
    except Exception as e:
        advice = f"Error generating advice: {str(e)}"
    return advice
