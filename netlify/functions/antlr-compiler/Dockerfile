# Use an official Node.js runtime as a parent image
FROM public.ecr.aws/lambda/nodejs:18

# Set the working directory
WORKDIR ${LAMBDA_TASK_ROOT}

# Install OpenJDK 11
RUN yum update -y && \
    yum install -y java-11-openjdk-devel && \
    yum clean all

# Copy the function code and dependencies
COPY index.ts .
COPY tsconfig.json .
COPY antlr-4.13.1-complete.jar .

# Netlify's build process will handle the compilation of TypeScript.
# The CMD is provided by the base image.