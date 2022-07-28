const fs = require("fs");
const env = require("dotenv").config();
const { parse } = require( 'node-html-parser');

function getHTMLContent(filePath) {
    const content = parse(fs.readFileSync(filePath, "utf8"))
    const head = content.getElementsByTagName("head")[0]
    const body = content.getElementsByTagName("body")[0]
    return {content, head, body}
}

async function mergeFiles(staticContentPath, dynamicContentPath){
    const staticContent = getHTMLContent(staticContentPath)
    const {head: staticHead, body: staticBody} = staticContent
    
    const dynamicContent = getHTMLContent(dynamicContentPath)
    const {head: dynamicHead, body: dynamicBody} = dynamicContent

    console.log({staticContent, dynamicContent, staticHead, dynamicHead, staticBody, dynamicBody: dynamicBody})
}

mergeFiles("../index.html", "../table.html")
