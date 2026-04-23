import os
import json
from bs4 import BeautifulSoup

def extract_content(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
        
        # Extract metadata
        title = soup.find('title').text if soup.find('title') else os.path.basename(html_path)
        
        # Extract case study sections
        content = []
        sections = soup.find_all(class_='case-section')
        for section in sections:
            heading = section.find(class_='case-heading')
            text = section.find(class_='case-text')
            if heading and text:
                content.append(f"{heading.text.strip()}: {text.text.strip()}")
        
        # Also check for intro-text
        intro = soup.find(class_='intro-text')
        if intro:
            content.insert(0, intro.text.strip())
            
        return {
            "title": title,
            "content": "\n\n".join(content)
        }

def process_all_projects(source_dir, output_file):
    results = []
    for filename in os.listdir(source_dir):
        if filename.startswith("Project_") and filename.endswith(".html"):
            print(f"Processing {filename}...")
            data = extract_content(os.path.join(source_dir, filename))
            data["id"] = filename.replace("Project_", "").replace(".html", "")
            results.append(data)
            
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    source = "../../projects/" # protfolio/projects/
    output = "projects_content.json"
    process_all_projects(source, output)
