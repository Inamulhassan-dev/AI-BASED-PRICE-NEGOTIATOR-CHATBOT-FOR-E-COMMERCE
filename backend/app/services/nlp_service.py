import re
import random
from typing import Dict, Optional


class NLPService:
    def __init__(self):
        self.intent_patterns = {
            "ask_discount": [
                r"discount", r"offer", r"deal", r"cheaper", r"reduce price",
                r"best price", r"lower price", r"can you.*price", r"promo", r"coupon",
            ],
            "negotiate": [
                r"negotiate", r"bargain", r"haggle", r"can we", r"what if",
                r"better deal", r"counter offer", r"how about",
            ],
            "price_too_high": [
                r"too expensive", r"too high", r"costly", r"overpriced",
                r"can't afford", r"out of budget", r"budget", r"expensive",
            ],
            "accept_offer": [
                r"\byes\b", r"\bokay\b", r"\bfine\b", r"\bdeal\b", r"\baccept\b",
                r"agreed", r"take it", r"go ahead", r"sounds good", r"perfect",
            ],
            "reject_offer": [
                r"\bno\b", r"not good", r"still high", r"more discount",
                r"better than", r"not enough", r"can do better",
            ],
            "price_inquiry": [r"how much", r"what.*price", r"\bcost\b", r"\bprice\b"],
            "comparison": [r"amazon", r"flipkart", r"compare", r"other.*cheaper", r"elsewhere"],
        }

    def detect_intent(self, text: str) -> str:
        text = text.lower()
        for intent, patterns in self.intent_patterns.items():
            for pattern in patterns:
                if re.search(pattern, text):
                    return intent
        return "general_query"

    def analyze_sentiment(self, text: str) -> float:
        """Simple rule-based sentiment (-1 to 1)"""
        positive_words = ["good", "great", "love", "nice", "perfect", "excellent", "happy", "yes", "okay", "fine"]
        negative_words = ["bad", "expensive", "high", "costly", "overpriced", "no", "terrible", "awful", "hate"]
        text_lower = text.lower()
        score = 0.0
        for w in positive_words:
            if w in text_lower:
                score += 0.2
        for w in negative_words:
            if w in text_lower:
                score -= 0.2
        return max(-1.0, min(1.0, score))

    def extract_price_mention(self, text: str) -> Optional[float]:
        patterns = [
            r'₹\s?(\d+(?:,\d+)*(?:\.\d+)?)',
            r'rs\.?\s?(\d+(?:,\d+)*(?:\.\d+)?)',
            r'(\d+(?:,\d+)*(?:\.\d+)?)\s?(?:rupees|rs|inr)',
        ]
        for pattern in patterns:
            match = re.search(pattern, text.lower())
            if match:
                return float(match.group(1).replace(',', ''))
        return None

    def extract_discount_percent(self, text: str) -> Optional[float]:
        pattern = r'(\d+(?:\.\d+)?)\s?(?:%|percent|percentage)'
        match = re.search(pattern, text.lower())
        if match:
            return float(match.group(1))
        return None
