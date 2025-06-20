Clone the repository :Add commentMore actions

git clone https://github.com/pathak16/udyam

Start the frontend:

cd frontend
npm install 
npm run dev

Start the backend

cd backend
python -m venv env 
env\Scripts\activate

pip install -r requirements.txt
pip install uvicorn 
uvicorn :main app --reload
