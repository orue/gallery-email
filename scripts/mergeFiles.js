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

function mergeFiles(staticContentPath, dynamicContentPath) {
    const {content: staticContent, head: staticHead, styles: staticHeadStyles, body: staticBody} = getHTMLContent(staticContentPath)
    const {content: dynamicContent, head: dynamicHead, styles: dynamicHeadStyles, body: dynamicBody} = getHTMLContent(dynamicContentPath)
    
    // insert dynamic styles at the end of the static head
    // todo: insert after the static style tag?
    for (const style of dynamicHeadStyles) {
        staticHead.appendChild(style)
    }

    // insert dynamic body between the static body's header and footer
    staticBody.getElementById("body-dynamic").replaceWith(dynamicBody);

    return staticContent.outerHTML
}

const outputHTML = mergeFiles("../index.html", "../table.html")
fs.writeFileSync("./output/output.html", outputHTML, "utf-8")
