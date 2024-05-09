import boto3
import json

# Initialize a Lambda client with the appropriate AWS region
lambda_client = boto3.client('lambda', region_name='us-east-1')

# Define the payload, this can be adjusted as needed
payload = {
    "body": json.dumps({
        "image": "your_base64_string_here",  # Replace with your actual base64 image data
        "userId": "example-user",
        "uploadDate": "2024-05-04"
    })
}

# Invoke the Lambda function
response = lambda_client.invoke(
    FunctionName='ImageUploadLambda',
    InvocationType='RequestResponse',
    Payload=json.dumps(payload)  # Ensure payload is serialized to JSON
)

# Print the response from the Lambda function
print(response['Payload'].read().decode('utf-8'))
