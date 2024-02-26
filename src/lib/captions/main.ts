type parserOptions = {
    lines: number;
    chars: number;
}

type blockType = {
    lines: string[];
}

type captionType = {
    blocks: Array<blockType>;
}
const wrap = (s: string, w: number) => s.replace(
    new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
);

export function parser(options: parserOptions, text: string): captionType {
    const lines = wrap(text, options.chars).split("\n")
    var buffer = lines
    let blocks = [];

    let block: blockType = {
        lines: []
    }

    while (buffer.length > 0) {
        block.lines = buffer.slice(0, options.lines) 
        buffer = buffer.slice(options.lines)
        if (block.lines.length > 0) {
            if (buffer.length > 0) {
                let last = block.lines.pop() || ""
                if (".,!?".indexOf(last.charAt(last.length-1)) == -1) {
                    last += "-"
                    block.lines.push(last)
                    buffer[0] = "-" + buffer[0]
                }
            }
            blocks.push({...block})
        }
        block.lines = []
    }

    const captions: captionType= {
        blocks: blocks
    }
    return captions
}
