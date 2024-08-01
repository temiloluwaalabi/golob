import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
const apiKey = process.env.NEXT_GOOGLE_GEMINI_API_KEY;
export async function POST(req: NextRequest, res: NextResponse) {
  const genAI = new GoogleGenerativeAI(apiKey as string);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const data = await req.json();
    const userPrompt = data.userPrompt;
    console.log(userPrompt);
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: 'I have a web application where users can register and also agencies can register to start selling travel packages, flights, etc, I have 2 onboarding process, the per-registration and post registration, the pre-registration, after users have entered their agency name and legal business name, I want to generate custom url prefix, what I mean is, lets say my website url is landfrica.com and a user registers and names his company as davidleo, I want to be able to generate a series to url prefix that can be attached to url so the agency url can be something like "prefix.landfrica.com", let\'s say leoclan prefix is generated and the user picks that so his url will be leoclan.landfrica.com, do you understand?\n',
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Yes, I understand! You want to dynamically generate unique URL prefixes for agencies registering on your travel platform, allowing them to have their own branded subdomain under your main domain (landfrica.com). \n\nHere's a breakdown of how to achieve this and some considerations:\n\n**1.  Generate Unique Prefixes:**\n\n   * **Random String Generation:** You can use a library or function to generate random strings of characters (alphanumeric, lowercase, etc.).  You'll want to make sure the string is relatively short (e.g., 5-8 characters) for ease of use.\n   * **Custom Word List:** You could create a list of appropriate words (perhaps related to travel, regions, or general business themes) and randomly select from this list. This can make the prefixes more memorable and relevant.\n   * **Hashing:**  You could hash the agency's name or registration ID. This will create a unique identifier, but might not be as easy to remember.\n\n**2. Check for Availability:**\n\n   * **Database Lookup:** After generating a prefix, check your database to see if it's already assigned to another agency. \n   * **Retry if Needed:** If the prefix is taken, repeat the generation process until you find an available one.\n   * **User Selection:** After generating a few potential prefixes, you can allow the agency to choose the one they like best from a list.\n\n**3. Store the Prefix and Associate with the Agency:**\n\n   * **Database Entry:** Store the generated prefix in your database, linked to the agency's account information.\n\n**4.  Implement Subdomain Routing:**\n\n   * **Web Server Configuration:**  Use your web server's configuration (e.g., Apache's .htaccess or Nginx configuration) to define a wildcard subdomain rule that redirects any requests to `prefix.landfrica.com` to your application. \n   * **Application Logic:**  Within your application, use the prefix to identify the agency associated with a particular request. This allows you to fetch the correct agency data and display their content.\n\n**Example (Simplified) .htaccess Rule:**\n\n```\nRewriteEngine On\nRewriteCond %{HTTP_HOST} ^(.*)\\.landfrica\\.com$ [NC]\nRewriteRule ^$ /agency.php?prefix=%1 [L,QSA]\n```\n\n**Considerations:**\n\n* **Prefix Length:** Short, memorable prefixes are best.\n* **Character Set:** Choose appropriate characters for your prefixes (lowercase letters, numbers, maybe hyphens).\n* **Collision Handling:** If many agencies register, your algorithm might need to generate a lot of prefixes before finding an available one.  You could consider allowing users to submit their own preferred prefixes and checking for availability.\n* **Branding:**  Let agencies understand that they are responsible for their own brand (e.g., website, logo) under their chosen subdomain.\n\nLet me know if you'd like to explore specific technologies or code examples for implementing this! \n",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "Generate a list of prefix, 10 in number, the name of the agency is Davidleo Travels, they are a travel agency where they sell tour packages, flights, etc. I also have a list of all the prefix that has been stored in the database",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: 'Okay, here\'s a list of 10 prefix suggestions for "Davidleo Travels" focusing on travel, tour packages, and flights, while also considering common prefixes in your database:\n\n**Assumptions:**\n\n* **Database Prefixes:** I\'ll assume you have a database of existing prefixes to avoid collisions.\n* **Desired Style:**  I\'ll aim for prefixes that are short, memorable, and relevant to travel.\n\n**Prefix Suggestions:**\n\n1. **dltours:**  (Simple, uses initials, and hints at "tours")\n2. **davidleoexp:** (Conveys exploration and adventure)\n3. **travelleo:** (Combines "travel" with the agency name)\n4. **flydleo:** (Focuses on flights, using "fly" as a verb)\n5. **leojourneys:** (Implies journeys and experiences)\n6. **davpack:** (Short and to the point for package deals)\n7. **worldleo:** (Suggests global reach)\n8. **leoadventures:**  (Emphasizes adventure and excitement)\n9. **exploreleo:** (Emphasizes exploration)\n10. **leovoyages:** (Sophisticated, implies longer trips)\n\n**Additional Tips:**\n\n* **Check for Database Collisions:** Before finalizing a prefix, make sure it\'s not already in use by checking your database.\n* **User Preference:**  Allow Davidleo Travels to choose their preferred prefix from the list.\n* **Branding:**  Encourage Davidleo Travels to develop their own brand identity and website design around their chosen prefix.\n\nLet me know if you\'d like to generate more prefixes or have specific preferences in mind! \n',
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: "give me in a json format\n" }],
        },
        {
          role: "model",
          parts: [
            {
              text: '```json\n[\n  "dltours",\n  "davidleoexp",\n  "travelleo",\n  "flydleo",\n  "leojourneys",\n  "davpack",\n  "worldleo",\n  "leoadventures",\n  "exploreleo",\n  "leovoyages"\n]\n``` \n',
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: 'so now, another agency is serendip, they are also into travel and tourism, this is a list of prefix that are already stored in the database that has been chosen by some users: [\n  "dltours",\n  "davidleoexp",\n  "travelleo",\n  "flydleo",\n  "leojourneys",\n  "davpack",\n  "worldleo",\n  "leoadventures",\n  "exploreleo",\n  "leovoyages"\n] so the prefix you are generating now should not clash',
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: 'You got it! Here are 10 prefix suggestions for "Serendip" that avoid the prefixes already in your database:\n\n```json\n[\n  "serenjourns",\n  "serendiptrips",\n  "serenvoyage",\n  "serenexplore",\n  "serenfly",\n  "serenwander",\n  "serendest",\n  "serenpath",\n  "serenroutes",\n  "serenhorizon"\n]\n```\n\nI\'ve tried to keep the prefixes:\n\n* **Short & Memorable:** Easy to remember and type.\n* **Relevant to Travel:** Using words like "journeys," "trips," "voyage," "explore."\n* **Unique:**  Avoiding collisions with the existing prefixes you provided. \n\nLet me know if you\'d like me to generate more suggestions or if you have specific themes or styles you\'d like to incorporate! \n',
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: 'I will love if you also include the name of the agency itselg, and if you can also include the combination of the name of the agency and the word "agency"',
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: 'You got it! Here are 10 prefix suggestions for "Serendip" incorporating the agency name and "agency" where appropriate:\n\n```json\n[\n  "serenjourns",\n  "serendiptrips",\n  "serenvoyage",\n  "serenexplore",\n  "serenfly",\n  "serenwander",\n  "serendest",\n  "serenpath",\n  "serenroutes",\n  "serenhorizon",\n  "serendip",\n  "serendipagency",\n  "serenagency",\n  "serendiptravel",\n  "serendipjourneys",\n  "serenagencytours"\n]\n```\n\nI\'ve added prefixes that:\n\n* **Include the full agency name:** "serendip"\n* **Combine agency name with "agency":** "serendipagency", "serenagency"\n* **Combine agency name with other travel-related terms:** "serendiptravel", "serendipjourneys", "serenagencytours"\n\nThis gives Serendip more options to choose from, reflecting their brand and highlighting their agency status.  \n\nLet me know if you\'d like any more suggestions or have specific requests! \n',
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(userPrompt);
    console.log(result.response);
    const response = result.response.text();
    console.log(response);
    return NextResponse.json({
      text: response,
    });
  } catch (error) {
    return NextResponse.json({
      text: "Unable to process the prompt. Please try again",
    });
  }
}
