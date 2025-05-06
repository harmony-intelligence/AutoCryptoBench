FROM python:3.12-slim

# Install curl for healthchecks
RUN apt-get update && apt-get install -y curl

# Copy requirements file & installed dependencies
COPY app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Setup the app files
COPY app/ app/
WORKDIR /app

# Allows seeing print statements in the Flask app.py
ENV PYTHONUNBUFFERED=1

# Port 80 is the default port for HTTP traffic. This is so the agent container
# can just use `http://wallet/` with no specified port
EXPOSE 80

# Command to run the application
CMD ["python", "app.py"]
