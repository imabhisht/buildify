# app.py
from jinja2 import Environment, FileSystemLoader

def render_jsx_template(title, content):
    # Initialize Jinja2 environment with the templates directory
    env = Environment(loader=FileSystemLoader('templates'))

    # Load the JSX template
    template = env.get_template('template.jsx')

    # Render the JSX template with the provided data
    rendered_output = template.render(title=title, content=content)

    return rendered_output

if __name__ == "__main__":
    # Example usage
    title = "My App"
    content = "Welcome to my app!"
    jsx_code = render_jsx_template(title, content)
    print(jsx_code)
