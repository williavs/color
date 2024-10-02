import base64
from typing import List
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

def analyze_colors(images: List[str]):
    try:
        model = ChatOpenAI(model="gpt-4o")
        
        system_message = SystemMessage(content="""
You are an expert color analyst specializing in the 12-season color system. Your task is to analyze images of individuals and provide a comprehensive color analysis. Use your expertise to determine the most flattering color palette based on the person's skin tone, hair color, and eye color.

Follow these guidelines:
1. Analyze the images carefully, considering undertone, value, and chroma.
2. Determine the most suitable color season out of the 12 options.
3. Provide a detailed explanation of your analysis.
4. Recommend specific colors and styling advice.
5. Use the provided delimiters to structure your response.

Remember, your analysis should be precise, informative, and tailored to the individual in the images.
""")

        image_contents = []
        for image in images:
            image_data = base64.b64encode(image).decode("utf-8")
            image_contents.append({
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{image_data}"}
            })

        human_message_content = [
            {"type": "text", "text": """
Analyze the colors in these images and provide a comprehensive color analysis based on the 12-season color system. Structure your response using the following delimiters:

<ANALYSIS>
1. Undertone: Determine if the person's skin has a warm (golden/yellow) or cool (blue/pink) undertone.
2. Value: Assess the overall lightness or darkness of the person's coloring, particularly their hair.
3. Chroma: Evaluate the clarity or mutedness of the person's natural coloring.
</ANALYSIS>

<SEASON>
Determine which of the 12 color seasons best matches the person's coloring:
- Spring: Light Spring, True Spring, Bright Spring
- Summer: Light Summer, True Summer, Soft Summer
- Autumn: Soft Autumn, True Autumn, Dark Autumn
- Winter: Dark Winter, True Winter, Bright Winter
</SEASON>

<EXPLANATION>
Provide a detailed explanation of why this season was chosen, referencing the person's skin tone, hair color, and eye color. Include how the chosen season's characteristics align with the person's natural coloring.
</EXPLANATION>

<PALETTE>
Describe the key characteristics of this season's color palette (e.g., warm and bright for Spring, cool and muted for Summer). Explain how these characteristics complement the person's natural coloring.
</PALETTE>

<RECOMMENDATIONS>
1. List 7-10 specific colors that would be particularly flattering for this person to wear. Include both clothing and accessory colors.
2. Suggest 3-5 colors to avoid and explain why they might be less flattering.
3. Recommend makeup colors for eyes, cheeks, and lips that would enhance the person's natural coloring.
4. Provide advice on jewelry metals (gold, silver, rose gold) that would complement their coloring.
</RECOMMENDATIONS>

<TIPS>
Offer additional tips or considerations for choosing clothing colors, patterns, or makeup that would enhance their natural coloring. Include any specific advice based on the person's unique features or coloring.
</TIPS>
"""},
        *image_contents
    ]

        human_message = HumanMessage(content=human_message_content)
        print("Sending request to OpenAI")
        response = model.invoke([system_message, human_message])
        print("Received response from OpenAI")

        return response.content
    except Exception as e:
        print(f"Error in analyze_colors: {str(e)}")
        raise

def process_analysis_results(raw_results: str):
    try:
        # For now, we'll just return the raw results
        # You can add more processing here if needed
        return raw_results
    except Exception as e:
        print(f"Error in process_analysis_results: {str(e)}")
        raise