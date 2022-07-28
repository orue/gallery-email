const fs = require("fs");
const env = require("dotenv").config();
const { parse } = require( 'node-html-parser');

function getHTMLContent(filePath) {
    const content = parse(fs.readFileSync(filePath, "utf8"))
    const head = content.getElementsByTagName("head")[0]
    const styles = head.getElementsByTagName("style")
    
    const body = content.getElementsByTagName("body")[0]
    return {content, head, styles, body}
}

async function mergeFiles(staticContentPath, dynamicContentPath){
    const {content: staticContent, head: staticHead, styles: staticHeadStyles, body: staticBody} = getHTMLContent(staticContentPath)
    const {content: dynamicContent, head: dynamicHead, styles: dynamicHeadStyles, body: dynamicBody} = getHTMLContent(dynamicContentPath)
    
    // to insert at the end of the head
    // todo: insert after the static style tag?
    for (const style of dynamicHeadStyles) {
        staticHead.appendChild(style)
    }

    // for (const style of mergedStyles) {
    //     console.log({style})
    // }
    // console.log({staticContent, dynamicContent, staticHead, dynamicHead, staticBody, dynamicBody: dynamicBody})

    fs.writeFileSync("./output/output.html", staticContent.outerHTML, "utf-8")
}

mergeFiles("../index.html", "../table.html")
