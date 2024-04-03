# Use a lightweight Bun base image
FROM oven/bun

# Optional: Set working directory (recommended)
WORKDIR /app

# Copy your Bun.js project files
COPY . .

# Install dependencies (use `bun install` for Bun.js projects)
RUN bun install

# Set the command to execute your Bun.js application (replace `index.js` with your actual entry point)
CMD ["bun", "run", "index.ts"]