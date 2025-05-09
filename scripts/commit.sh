#!/bin/bash

# Function to generate commit message
generate_commit_message() {
    local type=$1
    local scope=$2
    local title=$3
    local body=$4

    # Create temporary file for commit message
    local temp_file=$(mktemp)
    
    # Write header
    echo "$type($scope): $title" > "$temp_file"
    echo "" >> "$temp_file"
    
    # Write body if provided
    if [ ! -z "$body" ]; then
        echo "$body" >> "$temp_file"
    fi
    
    # Return the file path
    echo "$temp_file"
}

# Function to validate commit type
validate_commit_type() {
    local type=$1
    local valid_types=("feat" "fix" "docs" "style" "refactor" "test" "chore" "ci" "build" "perf" "revert")
    
    for valid_type in "${valid_types[@]}"; do
        if [ "$type" == "$valid_type" ]; then
            return 0
        fi
    done
    
    return 1
}

# Main script
if [ "$#" -lt 3 ]; then
    echo "Usage: $0 <type> <scope> <title> [body]"
    echo "Types: feat, fix, docs, style, refactor, test, chore, ci, build, perf, revert"
    exit 1
fi

type=$1
scope=$2
title=$3
body=$4

# Validate commit type
if ! validate_commit_type "$type"; then
    echo "Error: Invalid commit type '$type'"
    echo "Valid types: feat, fix, docs, style, refactor, test, chore, ci, build, perf, revert"
    exit 1
fi

# Generate commit message
commit_file=$(generate_commit_message "$type" "$scope" "$title" "$body")

# Open editor for review/edit
${EDITOR:-vim} "$commit_file"

# Commit with the message
git commit -F "$commit_file"

# Clean up
rm "$commit_file"

# Push to the current branch
git push origin HEAD

echo "✅ Changes committed and pushed successfully!"
echo "Commit message: $title" 
