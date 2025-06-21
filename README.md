Clone the repository :
git clone https://github.com/pathak16/udyam.git

Navigate to the project folder:
cd udyam

Open the frontend folder:
cd frontend
npm install
npm run dev


Backend:
cd backend

Activate virtual environment:
For macOS:

python -m venv env
source venv/bin/activate

For windows:
python -m venv env
env\Scripts\activate.bat    

pip install -r requirements.txt 
python main.py
uvicorn main:app --reload


