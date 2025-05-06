export const transferButtonHTMLActive = `
<button data-test=transfer-button
    class="relative inline-flex h-12 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium focus-visible:ring-primary-500 pointer-events-auto focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 bg-primary disabled:text-muted text-white enabled:hover:bg-opacity-90 cursor-pointer w-full">
    <div class="flex-shrink basis-0"></div>
    <div class=flex-1>Start transfer</div>
    <div class="flex h-full flex-shrink basis-0 items-center justify-end"></div>
</button>
`

export const transferButtonHTMLInactive = `
<button data-test="get-a-quote-button" disabled=""
    class="relative inline-flex h-12 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium focus-visible:ring-primary-500 pointer-events-auto focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 bg-primary disabled:text-muted text-white enabled:hover:bg-opacity-90 cursor-not-allowed bg-opacity-50 w-full">
    <div class="flex-shrink basis-0"></div>
    <div class="flex-1">Find the best price</div>
    <div class="flex h-full flex-shrink basis-0 items-center justify-end"></div>
</button>
`

export const transferDetailsHTMLInactive = `
<button
    class="bg-background relative flex h-16 items-center space-x-2 rounded-xl border-2 px-4 py-3 text-left outline-none focus:ring focus:ring-blue-500 w-full"
    type="button" aria-haspopup="dialog" aria-expanded="false"
    aria-controls="radix-:Rqqjtt6sq:" data-state="closed">
    <div class="flex-1 truncate">
        <div class="flex items-center space-x-2"
            data-test="route-selected">
            <div class="flex-1 space-y-1 truncate whitespace-nowrap">
                <div class="flex items-baseline space-x-1">
                    <div class="font-bold leading-none text-muted">0
                    </div>
                </div>
                <div class="text-muted flex space-x-2 whitespace-nowrap text-xs"
                    data-test="route-details">
                    <div
                        class="flex items-center justify-center space-x-1">
                        <svg viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img" aria-hidden="true"
                            data-fa="fas-clock"
                            class="h-4 w-4 svg-inline--fa fill-current fas-clock">
                            <path
                                d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z">
                            </path>
                        </svg><span>Time Est.</span></div>
                </div>
            </div>
        </div>
    </div>
</button>
`

export const transferDetailsHTMLTemplate = `
<button
    class="bg-background relative flex h-16 items-center space-x-2 rounded-xl border-2 px-4 py-3 text-left outline-none focus:ring focus:ring-blue-500 w-full"
    type=button aria-haspopup=dialog aria-expanded=false
    aria-controls=radix-:Rqqjtt6sq: data-state=closed>
    <div class="flex-1 truncate">
        <div class="flex items-center space-x-2"
            data-test=route-selected>
            <div class="flex-1 space-y-1 truncate whitespace-nowrap">
                <div class="flex items-baseline space-x-1">
                    <div id="receive-amount" class="font-bold leading-none">0.00102 ETH</div>
                    <div id="receive-amount-usd" class="text-muted text-xs">$2.79 USD</div>
                </div>
                <div class="text-muted flex space-x-2 whitespace-nowrap text-xs"
                    data-test=route-details>
                    <div id="receive-fees-usd" class="flex items-center space-x-1">$1.26 Fees</div>
                    <div>•</div>
                    <div
                        class="flex items-center justify-center space-x-1">
                        <svg viewBox="0 0 512 512"
                            xmlns=http://www.w3.org/2000/svg role=img
                            aria-hidden=true data-fa=fas-clock
                            class="h-4 w-4 svg-inline--fa fill-current fas-clock">
                            <path
                                d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z">
                            </path>
                        </svg><span>~1 sec</span></div>
                </div>
            </div>
            <div class="absolute -right-0.5 -top-0.5 z-10">
            </div>
        </div>
    </div><svg viewBox="0 0 320 512" xmlns=http://www.w3.org/2000/svg
        role=img aria-hidden=true data-fa=fas-caret-down
        class="text-muted h-4 w-4 svg-inline--fa fill-current fas-caret-down">
    </svg>
</button>
`

export const questItemHTMLTemplate = `
<div class="hover:bg-secondary/80 relative cursor-pointer space-y-2 rounded-xl border p-4"
    tabindex="0">
    <div class="flex items-center justify-between">
        <p id="name" class="text-base">Bridge to Arbitrum One</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
        <div class="text-muted flex h-8 items-center justify-center rounded px-2 py-1 text-xs">+50 Points</div>
        <div id="remaining" class="text-muted flex h-8 items-center justify-center rounded px-2 py-1 text-xs">5 Remaining</div>
        <div class="text-muted flex h-8 items-center justify-center rounded px-2 py-1 text-xs">$6.00 Minimum</div>
    </div>
</div>
`

export function createNodeFromHTML(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.firstChild;
}
