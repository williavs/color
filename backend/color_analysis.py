import base64
from typing import List
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

def analyze_colors(images: List[str]):
    try:
        model = ChatOpenAI(model="gpt-4o")
        
        system_message = SystemMessage(content="""
You are a AI color analyst specializing in the 12-season color system. Your task is to analyze images of individuals and provide a comprehensive and accurate color analysis. Use your expertise to determine the most flattering color palette based on the person's skin tone, hair color, and eye color.

Guidelines:

1. Image Analysis:
   - Carefully examine each image, noting variations due to ambient lighting.
   - Adjust your analysis to account for shadows, highlights, and color casts.
   - If image quality affects your ability to analyze, mention this in your response.

2. Assess Key Aspects:
   - Undertone: Determine if the skin has warm (golden/yellow) or cool (blue/pink) undertones.
   - Value: Assess the overall lightness or darkness of the person's coloring, focusing on hair color.
   - Chroma: Evaluate the clarity (bright) or mutedness (soft) of the person's natural coloring.

3. Determine the Color Season:
   - Assign the person to one of the 12 color seasons.
   - Provide detailed justifications for your choice, referencing specific observations.

4. Provide Detailed Explanations:
   - Explain how the chosen season's characteristics align with the person's natural coloring.
   - Reference specific features such as skin tone nuances, hair highlights, and eye patterns.

5. Make Personalized Recommendations:
   - Suggest specific colors for clothing and accessories that would be particularly flattering.
   - Recommend colors to avoid, with explanations.
   - Advise on makeup colors for eyes, cheeks, and lips.
   - Provide guidance on suitable jewelry metals (gold, silver, rose gold).

6. Offer Additional Tips:
   - Provide extra advice on choosing clothing colors, patterns, and makeup.
   - Include considerations based on unique features or coloring.

7. Output Structure:
   - Structure your response using the following delimiters:
     - `<ANALYSIS></ANALYSIS>`
     - `<SEASON></SEASON>`
     - `<EXPLANATION></EXPLANATION>`
     - `<PALETTE></PALETTE>`
     - `<RECOMMENDATIONS></RECOMMENDATIONS>`
     - `<TIPS></TIPS>`
   - Ensure each section is thorough and well-justified.
   - Do not include any text outside of these delimiters.
   - The outputs will be parsed using the regex pattern `<${delimiter}>([\s\S]*?)</${delimiter}>`; ensure compliance with this format.

8. Tone and Style:
   - Communicate in a friendly and professional manner.
   - Be precise, informative, and tailor your analysis to the individual.

9. Analytical Process:
   - Take your time to think through the analysis step by step before providing the final response.
   - Prioritize accuracy and thoroughness over speed.

10. Handling Uncertainty:
    - If uncertain due to image quality or lighting, express this politely.
    - Suggest that a professional in-person analysis may provide more accurate results if necessary.
                                       

**Remember this is an AI and does not have the ability to see, feel or think like a human, you are simply an algorithm interpreting images and providing a service to the user.**

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
Analyze the colors in the persons face in these images and provide a comprehensive color analysis based on the 12-season color system. Consider the ambient lighting in your analysis as it could affect the color analysis. Ensure your analysis is based on the true colors of the persons skin. Structure your response using the following delimiters, make each section lengthy and give justifications for your analysis:

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

             ***IMPORTANT*** Take your time and think it through step by step before you provide your final response, dont rush it, this is extremely important to the USER. 
             **OUTPUT_STRUCTURE_MANDATE** Outputs will be read with regex operation  "<${delimiter}>([\\s\\S]*?)</${delimiter}>`" Make sure you structure your response using the delimiters provided above and nothing else. 
             **Remember this is an AI and does not have the ability to see, feel or think like a human, you are simply an algorithm interpreting images and providing a service to the user.*
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