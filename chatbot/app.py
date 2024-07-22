from flask import Flask, request, jsonify
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores.chroma import Chroma
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from langchain.prompts import ChatPromptTemplate

app = Flask(__name__)

loader = PyMuPDFLoader("dataset.pdf")
data = loader.load()
# print(data[0])

splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
chunks = splitter.split_documents(data)

embeddings = HuggingFaceEmbeddings(model_name="distilbert-base-uncased")

db = Chroma.from_documents(chunks, embeddings)



PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context and only provide sentences relevant to the question. Do not provide additional sentences: {question}
"""

prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)

qa_model_name = "facebook/bart-large-cnn"
tokenizer = AutoTokenizer.from_pretrained(qa_model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(qa_model_name)
qa_pipeline = pipeline("summarization", model=model, tokenizer=tokenizer)

@app.route('/answer_question', methods=['POST'])
def answer_question():
    query = request.json['query']
    docs = db.similarity_search(query, k=1)
    context = "\n\n".join([doc.page_content for doc in docs])
    prompt = prompt_template.format(context=context, question=query)

    response = qa_pipeline(prompt)
    response_text = response[0]['summary_text']

    return jsonify({
        'response': response_text,
        'sources': docs
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)