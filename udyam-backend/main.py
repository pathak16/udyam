from fastapi import FastAPI, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import requests
import os
from dotenv import load_dotenv
from sklearn.cluster import DBSCAN
import google.generativeai as genai 

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key="YOUR_GEMINI_API_KEY")

# ✅ Define the app early
app = FastAPI()

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Gemini Route
import asyncio  # ✅ make sure this is at the top

@app.post("/ask-gemini")
async def ask_gemini(request: Request):
    try:
        data = await request.json()
        question = data["question"]
        insights = data["insights"]

        insight_text = "\n".join([
            f"{item['area']}: {item['count']} businesses, avg rating {item['avgRating']}, {item['recommendation']}"
            for item in insights
        ])

        prompt = (
            f"Based on the following cluster insights:\n\n{insight_text}\n\n"
            f"Answer the question: {question}"
        )

        print("🧠 Prompt to Gemini:\n", prompt)

        model = genai.GenerativeModel("gemini-flash-3.0")

        # 🛡️ Timeout safety
        response = await asyncio.wait_for(
            model.generate_content_async(prompt),
            timeout=15  # seconds
        )

        return {"answer": response.text}

    except asyncio.TimeoutError:
        print("⏳ Gemini API call timed out.")
        return {"answer": "Gemini took too long to respond. Try rephrasing your question."}

    except Exception as e:
        print("❌ Gemini Error:", str(e))
        return {"answer": "An error occurred while generating the response. Please try again."}

# ✅ Place Fetch Route
@app.get("/fetch_places")
def fetch_places(business_type: str = Query(...), location: str = Query(...)):
    cache_key = (business_type.lower(), location.lower())

    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": f"{business_type} in {location}",
        "key": GOOGLE_API_KEY
    }

    print("🟡 Querying for:", f"{business_type} in {location}")
    print("🟢 Google Params:", params)

    response = requests.get(url, params=params)
    data = response.json()
    print("🧾 Google Response Status:", data.get("status"))
    print("🧾 Number of Results:", len(data.get("results", [])))

    results = []
    for place in data.get("results", []):
        lat = place["geometry"]["location"]["lat"]
        lng = place["geometry"]["location"]["lng"]
        results.append({
            "name": place.get("name", "Unnamed"),
            "lat": lat,
            "lng": lng,
            "address": place.get("formatted_address") or place.get("vicinity") or "Address not available",
            "rating": place.get("rating", None),
            "user_ratings_total": place.get("user_ratings_total", 0),
            "map_url": f"https://www.google.com/maps/search/?api=1&query={place.get('name', '')} {place.get('formatted_address') or place.get('vicinity', '')}".replace(" ", "+")
        })

    return {"places": results}

# ✅ Clustering Route
class Coordinate(BaseModel):
    lat: float
    lng: float

@app.post("/cluster")
def cluster_locations(locations: List[Coordinate]):
    coords = [[loc.lat, loc.lng] for loc in locations]

    if not coords:
        return {"clusters": []}

    db = DBSCAN(eps=0.02, min_samples=2).fit(coords)
    labels = db.labels_

    clustered = []
    for i, (lat, lng) in enumerate(coords):
        clustered.append({
            "lat": lat,
            "lng": lng,
            "cluster": int(labels[i])
        })

    return {"clusters": clustered}
