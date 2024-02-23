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
    }

    const captions: captionType= {
        blocks: [block]
    }
    return captions
}
