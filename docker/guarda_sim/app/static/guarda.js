////////////////////////////////////////////////////////////////////////////////////////////////////
//// HTML templates
////////////////////////////////////////////////////////////////////////////////////////////////////

receiveTemplate = `
<div>
    <div class=main_wrapperWallets_19CZw>
        <div class=wallet-title_wrapper_21NTc>
            <div class=wallet-title_inputTitle_1qoG->Bitcoin</div>
            <div class=wallet-title_hidden_SSUSC id=hidden-text>Bitcoin</div>
            <div class=wallet-title_wrapperIcons_1Ur-i style=left:80px><span
                    class=wallet-title_iconPencil_3K078><svg viewBox="0 0 16 16"
                        version=1.1 xmlns=http://www.w3.org/2000/svg>
                        <path
                            d="M15.5734607,2.59855118 L13.3916568,0.414906388 C12.8419445,-0.135283192 11.8856326,-0.136340003 11.3337726,0.415963199 L1.55970019,10.2864781 C1.51637093,10.3301824 1.48510977,10.3838752 1.46806443,10.4428521 L0.0135512237,15.5380801 C-0.0226871755,15.6649656 0.0128353193,15.8018057 0.106243799,15.8952823 C0.175481982,15.9645887 0.268174557,16.001918 0.363355752,16.001918 C0.396730533,16.001918 0.430480313,15.9972817 0.46313919,15.9880431 L5.55400359,14.5322685 C5.61294639,14.5152232 5.66657104,14.4839279 5.7102412,14.4405646 L15.5734607,4.65711725 C15.8483339,4.38203951 15.9995943,4.01665554 15.9995943,3.62785126 C15.9995943,3.23904699 15.8483339,2.87362893 15.5734607,2.59855118 Z M9.74916931,3.0611277 L11.087706,4.39966439 L4.09925175,11.3881527 L3.59770958,10.3847275 C3.53590317,10.2614897 3.41021081,10.1837288 3.27241625,10.1837288 L2.69007916,10.1837288 L9.74916931,3.0611277 Z M0.892818195,15.1087761 L1.36647419,13.4507074 L2.5508528,14.635086 L0.892818195,15.1087761 Z M5.09057481,13.909568 L3.35075665,14.4065762 L1.59498405,12.6508036 L2.09199216,10.9109854 L3.04758818,10.9109854 L3.67434544,12.164534 C3.70949294,12.2348631 3.76666302,12.2920332 3.8369921,12.3271807 L5.09057481,12.9539379 L5.09057481,13.909568 L5.09057481,13.909568 Z M5.8178655,13.3115151 L5.8178655,12.729178 C5.8178655,12.5913835 5.74010465,12.4656911 5.61686682,12.4038847 L4.61344157,11.9023426 L11.6018958,4.9138883 L12.9404325,6.25242499 L5.8178655,13.3115151 Z M15.0603277,4.15145011 L13.4569405,5.74051925 L10.261041,2.54461972 L11.8490533,0.94232339 C12.1239265,0.667450189 12.6025938,0.667450189 12.877467,0.94232339 L15.0592709,3.12412729 C15.1966905,3.26154684 15.2723377,3.44406838 15.2723377,3.6383171 C15.2723377,3.83256583 15.1966905,4.01508737 15.0603277,4.15145011 Z">
                        </path>
                    </svg></span><span class=wallet-title_toggleButton_19I1q><svg
                        xmlns=http://www.w3.org/2000/svg x=0px y=0px
                        viewBox="0 0 59.049 59.049">
                        <path
                            d="M11.285 41.39a1 1 0 0 0 1.247-1.564 27.366 27.366 0 0 1-2.305-2.06l-7.398-7.398 7.629-7.629c7.334-7.333 18.003-9.836 27.839-6.534a1.004 1.004 0 0 0 1.267-.63 1.002 1.002 0 0 0-.63-1.267c-10.562-3.545-22.016-.857-29.89 7.016L0 30.368l8.812 8.812a29.52 29.52 0 0 0 2.473 2.21zM50.237 21.325a29.373 29.373 0 0 0-4.394-3.616 1 1 0 0 0-1.115 1.661 27.342 27.342 0 0 1 4.094 3.369l7.398 7.398-7.629 7.629c-7.385 7.385-18.513 9.882-28.352 6.356a1 1 0 1 0-.675 1.883 28.97 28.97 0 0 0 9.776 1.693c7.621 0 15.124-2.977 20.665-8.518l9.043-9.043-8.811-8.812z">
                        </path>
                        <path
                            d="M30.539 41.774c-2.153 0-4.251-.598-6.07-1.73a1 1 0 1 0-1.056 1.698 13.463 13.463 0 0 0 7.126 2.032c7.444 0 13.5-6.056 13.5-13.5a13.44 13.44 0 0 0-2.275-7.502 1 1 0 0 0-1.662 1.112 11.447 11.447 0 0 1 1.937 6.39c0 6.342-5.159 11.5-11.5 11.5zM30.539 18.774c2.065 0 4.089.553 5.855 1.6a1 1 0 0 0 1.019-1.721 13.49 13.49 0 0 0-6.875-1.879c-7.444 0-13.5 6.056-13.5 13.5 0 2.084.462 4.083 1.374 5.941a1 1 0 0 0 1.796-.88 11.392 11.392 0 0 1-1.17-5.06c.001-6.342 5.16-11.501 11.501-11.501zM54.621 5.567a.999.999 0 0 0-1.414 0l-46.5 46.5a.999.999 0 1 0 1.414 1.414l46.5-46.5a.999.999 0 0 0 0-1.414z">
                        </path>
                    </svg></span></div>
        </div>
        <div class=extra-menu_wrapper_nQDBL>
            <div class=extra-menu_iconWrapper_4YAP3><img
                    src=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0IDE4IiB3aWR0aD0iNCIgaGVpZ2h0PSIxOCI+CiAgICA8cGF0aCBmaWxsPSIjQzdDN0M3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yIDE0YTIgMiAwIDExMCA0IDIgMiAwIDAxMC00em0wLTdhMiAyIDAgMTEwIDQgMiAyIDAgMDEwLTR6bTAtN2EyIDIgMCAxMTAgNCAyIDIgMCAwMTAtNHoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4K
                    alt=Menu></div>
            <div class=extra-menu_menuWrapper_282dy hidden>
                <ul class=extra-menu_list_1SYc_>
                    <li>Show private keys
                    <li>Delete wallet
                </ul>
            </div>
        </div>
    </div>
    <div class=main_wrapperBlocks_150ld>
        <div class=qr-code_wrapper_2xCo6><canvas height=144 width=144></canvas></div>
        <div class=main_wallerWrapper_3wWNs>
            <div class=main_walletInfoContainer_1Fs-Y>
                <div class=main_walletInfo_3IaLQ>
                    <div class=main_titleBlock_3I5m->Wallet balance:</div>
                    <div class=main_contentBlock_3A6he>
                        <div
                            class="main_addressText_ertuY button-copy_button_C4eji">
                            0 BTC</div>
                        <div class=update-balance_update_3UoBL><img
                                src=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuODc1MDcxIDYuOTk5MTdDMS4zMTc4NyA2Ljk5OTE3IDEuNjc3MjUgNy4zMzE3MSAxLjc0MTQyIDcuNzY5MjZDMi4xMTUzOSAxMC4zMDA2IDQuMzAxOTggMTIuMjQ5OCA2LjkzNTQ2IDEyLjI0OThDMTAuMTMwMiAxMi4yNDk4IDEyLjY2ODYgOS4zODEyIDEyLjEwODUgNi4wODM4MUMxMS45NzM1IDUuMzExMTQgMTEuNjY2MiA0LjU3ODc5IDExLjIwOTQgMy45NDExOEMxMC43NTI2IDMuMzAzNTcgMTAuMTU4IDIuNzc3MDcgOS40Njk3NiAyLjQwMDc5QzcuNDI0MzUgMS4yOTA1NyA1LjEwNTkxIDEuNjY5NzggMy41MzA3MiAzLjAxMDQ0TDQuMTg5OTcgMy42Njk2OUM0LjU1NzUxIDQuMDM3MjMgNC4yOTczMSA0LjY2NTU2IDMuNzc3NSA0LjY2NTU2SDEuMTAyMDFDMC45NDcyODcgNC42NjU1NiAwLjc5ODg5NiA0LjYwNDA5IDAuNjg5NDg3IDQuNDk0NjhDMC41ODAwNzggNC4zODUyNyAwLjUxODYxMiA0LjIzNjg4IDAuNTE4NjEyIDQuMDgyMTVWMS40MDY2N0MwLjUxODYxMiAwLjg4Njg1OCAxLjE0Njk0IDAuNjI2NjYgMS41MTQ0OCAwLjk5NDIwNEwyLjI5MTU3IDEuNzcxM0M0LjM2OTA3IC0wLjA2ODc1NiA3LjQ3MzM2IC0wLjYyNDczOSAxMC4yMjQ3IDAuODE5NzY2QzEyLjE2MTYgMS44MzY2NCAxMy41MjkxIDMuNzUyNTMgMTMuODU1MiA1LjkxNTc5QzE0LjUwOTggMTAuMjU0NiAxMS4xNTIzIDE0IDYuOTM2MDQgMTRDMy40MjMzNyAxNCAwLjUwNjM2MSAxMS4zOTk4IDAuMDA5ODg1MDQgOC4wMjI0NkMtMC4wNjg4NzQzIDcuNDg1NzMgMC4zMzI1MDcgNi45OTkxNyAwLjg3NTA3MSA2Ljk5OTE3WiIgZmlsbD0iI0M3QzdDNyIvPgo8L3N2Zz4K
                                class=update-balance_updateIcon_1fB_9 alt=Update>
                        </div>
                    </div>
                    <div class="main_fiatAmount_1gACL main_userSelect_2aAUn">0.00
                        USD</div>
                </div>
            </div>
            <div class=main_walletInfoContainer_1Fs-Y>
                <div class=main_walletInfo_3IaLQ>
                    <div>
                        <div class="main_titleBlock_3I5m- main_titleBlockAddress_25et4">
                            <div>Wallet address:&nbsp;</div>
                        </div>
                        <div class=main_contentBlock_3A6he>
                            <div class="main_addressText_ertuY main_inline_3xrtU button-copy_button_C4eji">1ArKz67tqdUPwnEcbRbHMixdWKdRS6ufN1</div>
                            <a href=https://bitcoinblockexplorers.com/address/1ArKz67tqdUPwnEcbRbHMixdWKdRS6ufN1 target=_blank rel="noreferrer noopener" class=main_iconExplorer_1jjAY>
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTExLjMyOC42NkMxMC44ODguMjIgMTAuMzU4IDAgOS43NCAwSDIuMjQ4QzEuNjI4IDAgMS4wOTkuMjIuNjU5LjY2LjIyIDEuMSAwIDEuNjI4IDAgMi4yNDdWOS43NGMwIC42MTkuMjIgMS4xNDguNjYgMS41ODguNDQuNDQuOTY5LjY2IDEuNTg4LjY2SDkuNzRjLjYxOSAwIDEuMTQ4LS4yMiAxLjU4OC0uNjYuNDQtLjQ0LjY2LS45Ny42Ni0xLjU4OFYyLjI0OGMwLS42Mi0uMjItMS4xNDktLjY2LTEuNTg5ek05Ljk4OSA2LjI0MmEuNDY3LjQ2NyAwIDAgMS0uMzA0LjQ2LjU0My41NDMgMCAwIDEtLjE5NS4wNC40NjQuNDY0IDAgMCAxLS4zNTEtLjE0OEw4LjAxNSA1LjQ3IDMuODQ4IDkuNjM4YS40OC40OCAwIDAgMS0uMzUxLjE0OS40OC40OCAwIDAgMS0uMzUyLS4xNDlsLS43OTYtLjc5NmEuNDguNDggMCAwIDEtLjE0OC0uMzUxLjQ4LjQ4IDAgMCAxIC4xNDgtLjM1MWw0LjE2OC00LjE2OC0xLjEyNC0xLjEyNGMtLjE2MS0uMTUtLjE5OC0uMzMyLS4xMS0uNTQ2YS40NjcuNDY3IDAgMCAxIC40NjEtLjMwNEg5LjQ5YS40OC40OCAwIDAgMSAuMzUxLjE0OC40OC40OCAwIDAgMSAuMTQ5LjM1MXYzLjc0NnoiIGZpbGw9IiNEQ0RDREMiLz4KPC9zdmc+Cg==" alt>
                            </a>&nbsp;
                            <div class="popup" id="copyPopup">✓ Copied to clipboard!</div>
                        </div>
                    </div><br>
                </div>
            </div>
        </div>
    </div>
</div>
`

sendTemplate = `
<div class="index_wrapper_1XNki app_wrapperBlock_2EpA3">
        <div class=panel-right_block_UH0mN>
        <div><img src=data:, alt style=display:none><img
                src=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTY0IiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE2NCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNTkuMDIgNjkuODRhMzYuMiAzNi4yIDAgMDEtMi42Ny0xNC4xOGgtMzQuN3YtMS45OGgzOC41OXYxLjk4aC0xLjg3di41YTM0LjMgMzQuMyAwIDEwLjI4LTQuNDdoLTIuMDNhMzYuMzIgMzYuMzIgMCAxMTMuMjggMjAuMTRINDYuMjZ2LTEuOTloMTIuNzZ6TTM2LjE2IDM5LjVWMzcuNWgyMC41OHYxLjk5SDM2LjE2em0tMi42IDMyLjMzdi0xLjk5aDQuOTZ2MS45OWgtNC45NnptNTguOSAxMy42OWEyOS4xNyAyOS4xNyAwIDExMC01OC4zNCAyOS4xNyAyOS4xNyAwIDAxMCA1OC4zNHptMC0xLjk5YTI3LjE4IDI3LjE4IDAgMTAwLTU0LjM2IDI3LjE4IDI3LjE4IDAgMDAwIDU0LjM2eiIgZmlsbD0iIzcxOTBFQiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTQwLjg3IDE5Ljg0YzAtOC4zLTEuNjEtOS45Mi05LjkyLTkuOTIgOC4zIDAgOS45Mi0xLjYxIDkuOTItOS45MiAwIDguMyAxLjYyIDkuOTIgOS45MiA5LjkyLTguMyAwLTkuOTIgMS42Mi05LjkyIDkuOTJ6TTE1MC44IDkwLjQ4YzAtMTAuMy0yLTEyLjMtMTIuMy0xMi4zIDEwLjMgMCAxMi4zLTIgMTIuMy0xMi4zIDAgMTAuMyAyIDEyLjMgMTIuMyAxMi4zLTEwLjMgMC0xMi4zIDItMTIuMyAxMi4zek02LjE1IDkyLjQ2YzAtNS4xNS0xLTYuMTUtNi4xNS02LjE1IDUuMTUgMCA2LjE1LTEgNi4xNS02LjE1IDAgNS4xNSAxIDYuMTUgNi4xNSA2LjE1LTUuMTUgMC02LjE1IDEtNi4xNSA2LjE1eiIgZmlsbD0iI0YxRjJGQSIvPjxwYXRoIGQ9Ik01NC41NiAxMDBhMy43NyAzLjc3IDAgMTEwLTcuNTQgMy43NyAzLjc3IDAgMDEwIDcuNTR6bTAtMS4xOWEyLjU4IDIuNTggMCAxMDAtNS4xNiAyLjU4IDIuNTggMCAwMDAgNS4xNnptOTYuMjMtNzAuMjRhNC4zNyA0LjM3IDAgMTEwLTguNzMgNC4zNyA0LjM3IDAgMDEwIDguNzN6bTAtMS45OGEyLjM4IDIuMzggMCAxMDAtNC43NyAyLjM4IDIuMzggMCAwMDAgNC43N3oiIGZpbGw9IiNGMUYyRkEiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4K
                alt>
                <p>Instantly send your coins or tokens</p>
        </div>
        <!-- <div class=index_rightMessage_jUJT2>
            <div class="message_message_3y46A message_info_iHcBs">
                <div>The network requires at least 1 XRP balance at all times. Fee for the
                    transaction is charged whether it is successfully sent or failed and
                    depends on blockchain load.</div>
                </div>
        </div> -->
    </div>
    <div class="index_wrapperForm_2jcHv app_wrapperLeftBlock_3QLZp">
        <div class=label_label_AYLWs>From</div>
        <div class="input_wrapper_1oeau input_isSelect_34mZ3">
            <div class="input-wallets_wrapper_12X6h inputs_wrapper_2IV3F" tabindex=0
            role=button>
            <div class="input-wallets_inputWrapper_gym-U inputs_inputWrapper_k3xth">
                <div
                class="input-wallets_currencyBlock_1Qv6o inputs_currencyBlock_2rgQZ input-wallets_selectedItem_3ptgW input-wallets_spaceBetween_245ro">
                <div class=input-wallets_mainWalletInfo_3bDI_>
                    <div id="send-icon" class="icon-currency_icon_GAJBo icon-currency_fontIcon_sM3hm icon-currency_icon-xrp_3TZwl input-wallets_listTicker_MsBXH"
                                style=background-color:rgb(0,96,151)></div>
                            <div
                            class="input-wallets_currencyInfo_3uZGe inputs_currencyInfo_rdtMm input-wallets_currencyInfoWithoutValue_36nPe">
                            <span
                                    class="input-wallets_titleContainer_3LQfL input-wallets_titleContainerNewSelector_dXoDW"><span
                                    class="input-wallets_titleWrapper_Quc8F input-wallets_newSelectorTicker_1omzg"><span
                                            class="input-wallets_walletInfo_1Nxl0 input-wallets_walletInfoAbsolute_sXENs">Ripple</span></span></span>
                                <div> 4.800001 XRP</div>
                            </div>
                        </div>
                        <div
                        class="input-wallets_subInfoWalletSelected_15P26 input-wallets_subInfoWalletWithoutValue_3-2oP">
                            <div
                                class="input-wallets_currencyInfo_3uZGe inputs_currencyInfo_rdtMm input-wallets_clearMarginLeft_3Oj8s">
                                <div class=input-wallets_walletName_UPsg2><span
                                    class=input-wallets_titleContainer_3LQfL><span
                                    class="input-wallets_titleWrapper_Quc8F input-wallets_selectedWrapper_W8qVy input-wallets_newSelectorTicker_1omzg input-wallets_selectedSubWallet_1PRPe"><span
                                    class="input-wallets_walletInfo_1Nxl0 input-wallets_hideInfo_BwIQY"></span></span>
                                        <div class=input-wallets_walletType_1hbsh></div>
                                    </span></div>
                            </div>
                        </div>
                    </div>
                    <!-- <div
                        class="input-wallets_iconArrow_14i5R inputs_iconArrow_2EDQu input-wallets_iconNewSelector_1-C03">
                        <svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 10">
                            <path
                            d="m8.07 8.14-.7.7.7.72.7-.71-.7-.7zM14.44.36 7.36 7.43l1.42 1.42 7.07-7.07L14.44.36zM8.78 7.43 1.7.36.29 1.78l7.07 7.07 1.42-1.42z">
                            </path>
                        </svg></div> -->
                    </div>
            </div>
        </div>
        <div class=label_label_AYLWs>To<div class=label_action_21OBK>
            <!-- To My Wallet -->
        </div>
    </div>
        <div class=relative>
            <div class="input_wrapper_1oeau input_isSelect_34mZ3"><label
                    class=input-address_label_SKdqT><textarea
                    class="index_addressTo_y7nQj input-address_input_3BDk7 textarea_textarea_3EjI7"
                    name=textarea type=text spellcheck=false
                    placeholder="Enter XRP address" style=height:17px></textarea></label>
                    <div id="addressError" class=input_errorMessage_23H_H style=margin-top:-2px;padding-right:10px hidden>Enter an address</div>
                </div>
                <!-- <div class=qr-scanner-paste-button_wrapperQrScanner_24uj7>
                    <div>
                    <div
                        class="qr-scanner_wrapper_1Etxn tooltip-nottify_wrapper_1sHCE tooltip-nottify_oneLine_RWzyu">
                        <div
                            class="tooltip-nottify_tooltip_Dei-S tooltip-nottify_right_3HpPf tooltip-nottify_top_1vXFg">
                            <span class=undefined>Scan QR code</span></div>
                        <div><img
                            src=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiA+CiAgPHBhdGggZD0iTTUxMiAzMTV2NTdjMCAxMS05IDIwLTIwIDIwaC01NmEyMCAyMCAwIDEgMSAwLTQwaDM2di0zN2EyMCAyMCAwIDEgMSA0MCAwem0tMjc2LTk4YzExIDAgMjAtOSAyMC0yMHYtNDVoMjBjMTEgMCAyMC05IDIwLTIwVjIwYTIwIDIwIDAgMCAwLTIwLjctMjBBMjAuMyAyMC4zIDAgMCAwIDI1NiAyMC41VjM2aC0yMGEyMCAyMCAwIDEgMCAwIDQwaDIwdjM2aC0yMGMtMTEgMC0yMCA5LTIwIDIwdjY1YzAgMTEgOSAyMCAyMCAyMHpNMjAgMjk1YzExIDAgMjAtOSAyMC0yMHYtMjBoMjFhMjAgMjAgMCAxIDAgMC00MEgyMGMtMTEgMC0yMCA5LTIwIDIwdjQwYzAgMTEgOSAyMCAyMCAyMHptMjk2LTQwaDU0djU5LjVhMjAgMjAgMCAxIDAgNDAgLjV2LTIwaDIxYTIwIDIwIDAgMSAwIDAtNDBoLTIxdi0yMGMwLTExLTktMjAtMjAtMjBoLTc0YTIwIDIwIDAgMSAwIDAgNDB6bTE3Ni00MGEyMCAyMCAwIDEgMCAwIDQwIDIwIDIwIDAgMCAwIDAtNDB6bS0xNzYgODBjLTExIDAtMjAgOS0yMCAyMHYzN2gtMTBhMjAgMjAgMCAxIDAgMCA0MGgzMGMxMSAwIDIwLTkgMjAtMjB2LTU3YzAtMTEtOS0yMC0yMC0yMHptMCAxNzdoLTIwdi0yMGMwLTExLTktMjAtMjAtMjBoLTIwdi0yMGEyMCAyMCAwIDEgMC00MCAwdjQwYzAgMTEgOSAyMCAyMCAyMGgyMHYyMGMwIDExIDkgMjAgMjAgMjBoNDBhMjAgMjAgMCAxIDAgMC00MHptODAtNDBjMC0xMS05LTIwLTIwLTIwaC0xMGEyMCAyMCAwIDEgMCAwIDQwaDEwYzExIDAgMjAtOSAyMC0yMHptOTYgNDBoLTE2di0yMGEyMCAyMCAwIDEgMC00MCAwdjIwaC00MGEyMCAyMCAwIDEgMCAwIDQwaDk2YTIwIDIwIDAgMSAwIDAtNDB6TTIzNiAzMzJjMTEgMCAyMC05IDIwLTIwdi0zN2MwLTExLTktMjAtMjAtMjBoLTcydi0xOS41YTIwIDIwIDAgMSAwLTQwLS41djIwaC0xMGEyMCAyMCAwIDEgMCAwIDQwaDEwMnYxN2MwIDExIDkgMjAgMjAgMjB6TTAgMTIwVjYwQzAgMjcgMjcgMCA2MCAwaDYwYzMzIDAgNjAgMjcgNjAgNjB2NjBjMCAzMy0yNyA2MC02MCA2MEg2MGMtMzMgMC02MC0yNy02MC02MHptNDAgMGMwIDExIDkgMjAgMjAgMjBoNjBjMTEgMCAyMC05IDIwLTIwVjYwYzAtMTEtOS0yMC0yMC0yMEg2MGMtMTEgMC0yMCA5LTIwIDIwdjYwem01MC0xMGEyMCAyMCAwIDEgMCAwLTQwIDIwIDIwIDAgMCAwIDAgNDB6bTQyMi01MHY2MGMwIDMzLTI3IDYwLTYwIDYwaC02MGMtMzMgMC02MC0yNy02MC02MFY2MGMwLTMzIDI3LTYwIDYwLTYwaDYwYzMzIDAgNjAgMjcgNjAgNjB6bS00MCAwYzAtMTEtOS0yMC0yMC0yMGgtNjBjLTExIDAtMjAgOS0yMCAyMHY2MGMwIDExIDkgMjAgMjAgMjBoNjBjMTEgMCAyMC05IDIwLTIwVjYwem0tNTAgMTBhMjAgMjAgMCAxIDAgMCA0MCAyMCAyMCAwIDAgMCAwLTQwek0xODAgMzkydjYwYzAgMzMtMjcgNjAtNjAgNjBINjBjLTMzIDAtNjAtMjctNjAtNjB2LTYwYzAtMzMgMjctNjAgNjAtNjBoNjBjMzMgMCA2MCAyNyA2MCA2MHptLTQwIDBjMC0xMS05LTIwLTIwLTIwSDYwYy0xMSAwLTIwIDktMjAgMjB2NjBjMCAxMSA5IDIwIDIwIDIwaDYwYzExIDAgMjAtOSAyMC0yMHYtNjB6bS01MCAxMGEyMCAyMCAwIDEgMCAwIDQwIDIwIDIwIDAgMCAwIDAtNDB6IiBmaWxsPSIjNzE5MEVCIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4K
                            alt></div>
                        </div>
                </div>
            </div> -->
        </div>  
        <!-- <div class=index_addTagLink_1Yu7j>Add Destination Tag</div> -->
        <div class=label_label_AYLWs>Amount<div class=convert-dropdown_wrapper_5Rku2>
            <!-- <div class=convert-dropdown_inlineButton_1LZ4s>XRP<img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZmlsbD0iIzk2QjBGQSIgZD0iTTguMDcgOC40NzVsLS43MDYuNzA2LjcwNy43MDcuNzA2LS43MDctLjcwNi0uNzA2ek0xNC40MzYuNjk2TDcuMzY0IDcuNzY4bDEuNDEzIDEuNDEzIDcuMDcyLTcuMDdMMTQuNDM2LjY5N2wtLjAwMS0uMDAxek04Ljc3OSA3Ljc2OEwxLjcwNy42OTYuMjkzIDIuMTExbDcuMDcxIDcuMDcgMS40MTMtMS40MTNoLjAwMnoiLz4KPC9zdmc+Cg=="
                alt class=convert-dropdown_iconArrow_3Yqm6></div> -->
            </div>
        </div>
        <div class=relative>
            <div class=input_wrapper_1oeau><input name=lastpass-fix-search placeholder=0
                class="index_inputAmount_1eD0k input_input_25CrX" spellcheck=false
                autocorrect=off autocomplete=new-password value>
                <div id="amountError" class=input_errorMessage_23H_H style=margin-top:-27px;padding-right:10px hidden>Insufficient funds</div>
            </div>
            <div class=convert-amount_wrapper_1K_O7>0 USD</div>
        </div>
        <div class=misk-info_wrapper_2YxDq>
            <div class=misk-info_title_1hjRy>Available:</div>
            <div id="availableBalance">3.800001 XRP</div>
        </div>
        <div class=misk-info_wrapper_2YxDq>
            <div class=misk-info_title_1hjRy>Network fee:</div><span id="networkFee">—</span>
        </div>
        <div class="index_footerBlock_1tWo0 app_footerBlock_n86Kc">
            <div class="index_stepInfo_hdfF2 app_stepInfo_2VLE6">Step 1 of 2</div><button
            id=confirmSend
                class="button_button_3_BTF button_blue_3kfMO button_big_2giaQ"
                type=button>Next</button>
        </div>
    </div>
</div>
`

confirmTemplate = `
<div class=panel-right_block_UH0mN>
    <div><img src=data:, alt style=display:none><img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA4IiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwOCA5NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMjcuMTUgNC41MWwxOS4yMyAxOS4yM2gtMTkuMjNWNC41MXptLS43LTQuMTVsMjMuNiAyMy42djQ5LjRoLTIuNDNWMjYuMTdoLTIyLjlWMi43OUg2Mi42YTEuNyAxLjcgMCAwMC0xLjcgMS43djgzLjQ4aC0yLjQ0VjQuNUE0LjE1IDQuMTUgMCAwMTYyLjYuMzZoNjMuODR6TTcwLjEgNDcuNTJWNDUuMWg2OC4yOXYyLjQzSDcwLjExem0wIDExLjE1di0yLjQzaDY4LjI5djIuNDNINzAuMTF6bTAgMTEuMTVWNjcuNGg2OC4yOXYyLjQzSDcwLjExem03Ny41IDE3Ljgydi04Ljc2aDIuNDR2OC43NmgtMi40M3pNMTM1Ljk3IDk1Vjg0LjczaDIuNDRWOTVoLTIuNDR6IiBmaWxsPSIjNzE5MEVCIi8+PHBhdGggZD0iTTE1LjgzIDM4Ljk3YzAtMTMuMjUtMi41OC0xNS44My0xNS44My0xNS44MyAxMy4yNSAwIDE1LjgzLTIuNTggMTUuODMtMTUuODMgMCAxMy4yNSAyLjU4IDE1LjgzIDE1Ljg0IDE1LjgzLTEzLjI2IDAtMTUuODQgMi41OC0xNS44NCAxNS44M3ptMTc5LjI5IDQ3Ljc1YzAtMTAtMS45NS0xMS45NC0xMS45NC0xMS45NCAxMCAwIDExLjk0LTEuOTQgMTEuOTQtMTEuOTMgMCA5Ljk5IDEuOTQgMTEuOTMgMTEuOTMgMTEuOTMtMTAgMC0xMS45MyAxLjk0LTExLjkzIDExLjk0eiIgZmlsbD0iI0YxRjJGQSIvPjxwYXRoIGQ9Ik0yOC4yNiA4Ni43MmE3LjggNy44IDAgMTEwLTE1LjYgNy44IDcuOCAwIDAxMCAxNS42em0wLTIuNDRhNS4zNiA1LjM2IDAgMTAwLTEwLjcyIDUuMzYgNS4zNiAwIDAwMCAxMC43MnptMTQ2LjE1LTQ1LjNhNS4zNiA1LjM2IDAgMTEwLTEwLjcyIDUuMzYgNS4zNiAwIDAxMCAxMC43MXptMC0yLjQ0YTIuOTIgMi45MiAwIDEwMC01Ljg1IDIuOTIgMi45MiAwIDAwMCA1Ljg1eiIgZmlsbD0iI0YxRjJGQSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPgo="
            alt>
        <p>Please check details and confirm</p>
    </div>
</div>
<div class="confirm_wrapperForm_3wDBj app_wrapperLeftBlock_3QLZp">
    <div class=confirm_headerTitles_sMNxV>
        <h3>Are you sure you want to</h3>
        <h2 id="are-you-sure">Send 3.800001 XRP?</h2>
    </div>
    <div class=confirm-info_wrapper_ClzF_>
        <div class=confirm-info_title_36pfx>You will send<div
                class=confirm-info_subtitle_3fxsZ>Equivalent</div>
        </div>
        <div class=confirm-info_value_1TRpS>
            <span id="you-will-send" class=confirm_userSelect_1NW1X>3.800001 XRP</span>
            <div class=confirm-info_subvalue_2wMAA>
            <span id="fiat-equivalent" class=confirm_userSelect_1NW1X>8.86</span>
            <span class=nowrap>USD</span></div>
        </div>
    </div>
    <div class=confirm-info_wrapper_ClzF_>
        <div class=confirm-info_title_36pfx>From wallet<div
                class=confirm-info_subtitle_3fxsZ>Address</div>
        </div>
        <div id="from-wallet-title" class=confirm-info_value_1TRpS>Ripple<div class=confirm-info_subvalue_2wMAA>rHqvwUWYhMDyBRDQzhXnM4ndHjCzwb12v8</div>
        </div>
    </div>
    <div class=confirm-info_wrapper_ClzF_>
        <div class=confirm-info_title_36pfx>To address</div>
        <div id="to-address" class=confirm-info_value_1TRpS>rHqvwUWYhMDyBRDQzhXnM4ndHjCzwb12v8</div>
    </div>
    <div class=confirm-info_wrapper_ClzF_>
        <div class=confirm-info_title_36pfx>Network fee<div
                class=confirm-info_subtitle_3fxsZ>Equivalent</div>
        </div>
        <div class=confirm-info_value_1TRpS>&nbsp;
            <span class=confirm_userSelect_1NW1X>
                <span id="network-fee">0.000018 XRP</span>
            </span>
            <div class=confirm-info_subvalue_2wMAA>
                <span id="network-equivalent" class=confirm_userSelect_1NW1X>&lt; 0.01 </span>
                <span class=nowrap>USD</span>
            </div>
        </div>
    </div>
    <div class=confirm-info_wrapper_ClzF_>
        <div class=confirm-info_title_36pfx>Will receive</div>
        <div class=confirm-info_value_1TRpS>
            <span id="will-receive" class=confirm_userSelect_1NW1X>3.799983 XRP</span>
        </div>
    </div>
    <div class=confirm_separator_2nE9i></div>
    <div></div>
    <div class=confirm_footerBlock_3JqEX>
        <div class=confirm_stepInfo_39BBo>Step 2 of 2</div>
        <div class=confirm_buttonsWrapper_34O16><span id="backLink">Back</span>
        <button id="confirm-button" class="button_button_3_BTF button_blue_3kfMO button_big_2giaQ" type=button>Confirm</button></div>
    </div>
</div>
`

sentTemplate = `
<div class="confirm_wrapperForm_3wDBj app_wrapperLeftBlock_3QLZp">
    <div class=confirm_headerTitles_sMNxV>
        <h2>Transaction sent!</h2>
    </div>
</div>
`

////////////////////////////////////////////////////////////////////////////////////////////////////
//// Globals and constants
////////////////////////////////////////////////////////////////////////////////////////////////////

const assets = [
    {
        ticker: "ADA",
        walletTitle: "ADA",
        walletAddress: "addr1q8lrwww4c5xk5873pne79ljqjq7n27vf0a0fznfnxf986wppqvya456jpawfn7t0l4xjgr554wawgew5fxw4azds3alqxu2j4u",
        blockExplorerLink: "https://cardanoexplorer.org/en/address?address=addr1q8lrwww4c5xk5873pne79ljqjq7n27vf0a0fznfnxf986wppqvya456jpawfn7t0l4xjgr554wawgew5fxw4azds3alqxu2j4u",
        usdPerCoin: 1.01,
        networkFee: 0.5,
        balance: 20,
    },
    {
        ticker: "BNB",
        walletTitle: "Binance Smart Chain",
        walletAddress: "0x1ef4529994dcedba35bed04513b2fc4e73084501",
        blockExplorerLink: "https://bscscan.com/address/0x1ef4529994dcedba35bed04513b2fc4e73084501",
        usdPerCoin: 695.24,
        networkFee: 0.000021,
        balance: 0.0285,
    },
    {
        ticker: "BUSD",
        walletTitle: "Binance USD",
        walletAddress: "0x1ef4529994dcedba35bed04513b2fc4e73084501",
        blockExplorerLink: "https://bscscan.com/address/0x1ef4529994dcedba35bed04513b2fc4e73084501",
        usdPerCoin: 1,
        networkFee: 0.139048,
        balance: 20,
    },
    {
        ticker: "BTC",
        walletTitle: "Bitcoin",
        walletAddress: "1ArKz67tqdUPwnEcbRbHMixdWKdRS6ufN1",
        blockExplorerLink: "https://bitcoinblockexplorers.com/address/1ArKz67tqdUPwnEcbRbHMixdWKdRS6ufN1",
        usdPerCoin: 94422.91,
        networkFee: 0.00000234,
        balance: 0.0002117,
    },
    {
        ticker: "DOGE",
        walletTitle: "Dogecoin",
        walletAddress: "D7VtRnLmnk23U4brEbsmQaR4JWH9rhaxLs",
        blockExplorerLink: "https://dogeblocks.com/address/D7VtRnLmnk23U4brEbsmQaR4JWH9rhaxLs",
        usdPerCoin: 0.34,
        networkFee: 0.044,
        balance: 60,
    },
    {
        ticker: "ETH",
        walletTitle: "Ethereum",
        walletAddress: "0x1ef4529994dcedba35bed04513b2fc4e73084501",
        blockExplorerLink: "https://etherscan.io/address/0x1ef4529994dcedba35bed04513b2fc4e73084501",
        usdPerCoin: 3279.48,
        networkFee: 0.000063,
        balance: 0.006,
    },
    {
        ticker: "LTC",
        walletTitle: "Litecoin",
        walletAddress: "LMak9jhxZzMpBs7Qg9sW8qKDdav8erJq8F",
        blockExplorerLink: "https://litecoinblockexplorer.net/address/LMak9jhxZzMpBs7Qg9sW8qKDdav8erJq8F",
        usdPerCoin: 104.51,
        networkFee: 0.0000234,
        balance: 0.207,
    },
    {
        ticker: "XMR",
        walletTitle: "Monero",
        walletAddress: "4A49gKHkQuUTn1cpfCyYCTQAfWVnyiZ5t9dFRuptLmFCGyN8B5Xie2HNJ9AooYVzK3UsAPpzJDhCB8mznWHHVmzq6a67Xa8",
        blockExplorerLink: "https://xmrblockexplorer.org/search?value=4A49gKHkQuUTn1cpfCyYCTQAfWVnyiZ5t9dFRuptLmFCGyN8B5Xie2HNJ9AooYVzK3UsAPpzJDhCB8mznWHHVmzq6a67Xa8",
        usdPerCoin: 196.54,
        networkFee: 0.0017483,
        balance: 0.132,
    },
    {
        ticker: "DOT",
        walletTitle: "Polkadot",
        walletAddress: "16Y1YNAGd2fbiCcvgZb2m4kK24mWYPcn7AUf52mG2Q6gLEqf",
        blockExplorerLink: "https://polkadot.subscan.io/account/16Y1YNAGd2fbiCcvgZb2m4kK24mWYPcn7AUf52mG2Q6gLEqf",
        usdPerCoin: 6.75,
        networkFee: 0.0158241,
        balance: 3.28,
    },
    {
        ticker: "MATIC",
        walletTitle: "Polygon",
        walletAddress: "0x1ef4529994dcedba35bed04513b2fc4e73084501",
        blockExplorerLink: "https://polygonscan.com/address/0x1ef4529994dcedba35bed04513b2fc4e73084501",
        usdPerCoin: 0.46,
        networkFee: 0.000567,
        balance: 42.08,
    },
    {
        ticker: "XRP",
        walletTitle: "Ripple",
        walletAddress: "rHqvwUWYhMDyBRDQzhXnM4ndHjCzwb12v8",
        blockExplorerLink: "https://xrpscan.com/account/rHqvwUWYhMDyBRDQzhXnM4ndHjCzwb12v8",
        usdPerCoin: 2.53,
        networkFee: 0.000018,
        balance: 9.11,
    },
    {
        ticker: "USDT",
        walletTitle: "Tether (ETH)",
        walletAddress: "0x1ef4529994dcedba35bed04513b2fc4e73084501",
        blockExplorerLink: "https://etherscan.io/address/0x1ef4529994dcedba35bed04513b2fc4e73084501",
        usdPerCoin: 1,
        networkFee: 0.49,
        balance: 10,
    },
    {
        ticker: "USDT",
        walletTitle: "Tether (TRX)",
        walletAddress: "TL712ABraQJmKyQJwF5QrBYG3XrRWUNGdN",
        blockExplorerLink: "https://tronscan.org/#/address/TL712ABraQJmKyQJwF5QrBYG3XrRWUNGdN",
        usdPerCoin: 1,
        networkFee: 0.5,
        balance: 10,
    },
    {
        ticker: "USDT",
        walletTitle: "Tether (BNB)",
        walletAddress: "0x1ef4529994dcedba35bed04513b2fc4e73084501",
        blockExplorerLink: "https://bscscan.com/address/0x1ef4529994dcedba35bed04513b2fc4e73084501",
        usdPerCoin: 1,
        networkFee: 0.052,
        balance: 10,
    },
    {
        ticker: "TRX",
        walletTitle: "TRON",
        walletAddress: "TL712ABraQJmKyQJwF5QrBYG3XrRWUNGdN",
        blockExplorerLink: "https://tronscan.org/#/address/TL712ABraQJmKyQJwF5QrBYG3XrRWUNGdN",
        usdPerCoin: 0.24,
        networkFee: 1.1,
        balance: 96,
    },
    {
        ticker: "USDC",
        walletTitle: "USD Coin",
        walletAddress: "0x1ef4529994dcedba35bed04513b2fc4e73084501",
        blockExplorerLink: "https://etherscan.io/address/0x1ef4529994dcedba35bed04513b2fc4e73084501",
        usdPerCoin: 1,
        networkFee: 0.74,
        balance: 10,
    }
];

qrCodes = [
    'url("static/qr_codes/0.png")',
    'url("static/qr_codes/1.png")',
    'url("static/qr_codes/2.png")',
    'url("static/qr_codes/3.png")',
    'url("static/qr_codes/4.png")',
    'url("static/qr_codes/5.png")',
    'url("static/qr_codes/6.png")',
    'url("static/qr_codes/7.png")',
    'url("static/qr_codes/8.png")',
    'url("static/qr_codes/9.png")',
    'url("static/qr_codes/10.png")',
    'url("static/qr_codes/11.png")',
    'url("static/qr_codes/12.png")',
    'url("static/qr_codes/13.png")',
    'url("static/qr_codes/14.png")',
    'url("static/qr_codes/15.png")',
];


////////////////////////////////////////////////////////////////////////////////////////////////////
//// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////

function tickerChainToIndex(selectedTicker, selectedChain) {
    if (selectedTicker === "ADA") {
        return 0;
    } else if (selectedTicker === "BNB") {
        return 1;
    } else if (selectedTicker === "BUSD") {
        return 2;
    } else if (selectedTicker === "BTC") {
        return 3;
    } else if (selectedTicker === "DOGE") {
        return 4;
    } else if (selectedTicker === "ETH") {
        return 5;
    } else if (selectedTicker === "LTC") {
        return 6;
    } else if (selectedTicker === "XMR") {
        return 7;
    } else if (selectedTicker === "DOT") {
        return 8;
    } else if (selectedTicker === "MATIC") {
        return 9;
    } else if (selectedTicker === "XRP") {
        return 10;
    } else if (selectedTicker === "USDT" && selectedChain.includes("ETH")) {
        return 11;
    } else if (selectedTicker === "USDT" && selectedChain.includes("TRX")) {
        return 12;
    } else if (selectedTicker === "USDT" && selectedChain.includes("BNB")) {
        return 13;
    } else if (selectedTicker === "TRX") {
        return 14;
    } else if (selectedTicker === "USDC") {
        return 15;
    } else {
        return null;
    }
}

function getUsdBalanceString(index) {
    fiatValue = assets[index].balance * assets[index].usdPerCoin;
    return Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
    }).format(fiatValue);
}

function updateBalances() {
    coinBalances = document.querySelectorAll(".wallet-item_balanceContainer_2PULW");
    fiatBalances = document.querySelectorAll(".wallet-item_fiatBalance_1-3ZQ");
    totalFiatBalance = document.querySelector(".header_totalBalance_22Zlr").children[0];

    fiatTotal = 0.0;
    for (let i = 0; i < assets.length; i++) {
        coinBalances[i].textContent = assets[i].balance;

        fiatValue = assets[i].balance * assets[i].usdPerCoin;
        fiatBalances[i].textContent = getUsdBalanceString(i);
        fiatTotal += fiatValue;
    }

    totalFiatBalance.textContent = Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
    }).format(fiatTotal);
}

function updateReceivePage() {
    index = tickerChainToIndex(selectedTicker, selectedChain);
    const { unused_, walletTitle, walletAddress, blockExplorerLink } = assets[index];
    qrCode = qrCodes[index];

    document.querySelector(".wallet-title_inputTitle_1qoG-").textContent = walletTitle;
    document.querySelector('.main_addressText_ertuY.button-copy_button_C4eji').textContent = `${assets[index].balance} ${selectedTicker}`;
    document.querySelector(".main_fiatAmount_1gACL").textContent = getUsdBalanceString(index) + " USD";
    document.querySelector(".main_inline_3xrtU").textContent = walletAddress;
    document.querySelector(".main_iconExplorer_1jjAY").href = blockExplorerLink;
    document.querySelector("canvas").style.backgroundImage = qrCode;
}

function updateSendPage(address, amount) {
    index = tickerChainToIndex(selectedTicker, selectedChain);

    // Reset fields and hide error messages
    document.querySelector(".index_addressTo_y7nQj").value = address;
    document.querySelector(".index_inputAmount_1eD0k").value = amount;
    document.querySelector(".convert-amount_wrapper_1K_O7").textContent = "0 USD";
    document.getElementById("networkFee").textContent = "—";
    document.getElementById("addressError").hidden = true;
    document.getElementById("amountError").hidden = true;

    // Update the currency icon in "From"
    sourceIcon = document.querySelectorAll(".wallet-item_walletBlock_2oSdL")[index].children[0];
    sendIcon = document.getElementById("send-icon");
    sendIcon.style = sourceIcon.style.cssText;
    sendIcon.classList = sourceIcon.classList.value;
    sendIcon.classList.replace('wallet-item_iconCurrency_17djy', 'input-wallets_listTicker_MsBXH');
    sendIcon.innerHTML = sourceIcon.innerHTML;

    // Update wallet info and balances
    document.querySelector(".input-wallets_walletInfoAbsolute_sXENs").textContent = assets[index].walletTitle;
    document.querySelector(".input-wallets_currencyInfoWithoutValue_36nPe").children[1].textContent = `${assets[index].balance} ${selectedTicker}`;
    document.querySelector(".textarea_textarea_3EjI7").placeholder = `Enter ${selectedTicker} address`;
    document.getElementById("availableBalance").textContent = `${assets[index].balance} ${selectedTicker}`;
}

function updateConfirmPage(toAddress, amount) {
    index = tickerChainToIndex(selectedTicker, selectedChain);
    fiatEquivalent = parseFloat(amount) * assets[index].usdPerCoin;
    fiatString = Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
    }).format(fiatEquivalent).replace("$", "");

    // Update "Are you sure?" section
    document.getElementById("are-you-sure").textContent = `Send ${amount} ${selectedTicker}?`;
    document.getElementById("you-will-send").textContent = `Send ${amount} ${selectedTicker}`;
    document.getElementById("fiat-equivalent").textContent = fiatString;

    // Update "From" wallet info
    html = `${assets[index].walletTitle}<div id="from-wallet-address" class="confirm-info_subvalue_2wMAA">${assets[index].walletAddress}</div>\n        `;
    document.getElementById("from-wallet-title").innerHTML = html
    document.getElementById("to-address").textContent = toAddress;

    // Calculate network fee and fiat equivalent
    fiatFee = parseFloat(assets[index].networkFee) * assets[index].usdPerCoin;
    if (fiatFee < 0.01 && fiatFee > 0) {
        fiatFeeString = "<0.01"
    } else {
        fiatFeeString = Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD',
        }).format(fiatFee).replace("$", "");
    }
    document.getElementById("network-fee").textContent = `${assets[index].networkFee} ${selectedTicker}`;
    document.getElementById("network-equivalent").textContent = fiatFeeString;

    // Calculate receive amount by subtracting fees
    receiveAmount = parseFloat(amount) - parseFloat(assets[index].networkFee);
    receiveAmount = parseFloat(receiveAmount.toFixed(8));
    document.getElementById("will-receive").textContent = `${receiveAmount} ${selectedTicker}`;

    // Add event listener to "Confirm" button
    confirmButton = document.getElementById("confirm-button");
    confirmButton.addEventListener('click', async () => {
        console.log('Confirm clicked:', assets[index].walletAddress, toAddress, amount);

        // Send to the Flask app
        try {
            const response = await fetch('/confirm_send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fromAddress: assets[index].walletAddress,
                    toAddress: toAddress,
                    amount: amount,
                })
            });
            const result = await response.json();
            console.log('Response:', result);
        } catch (error) {
            console.error('Error:', error);
        }

        // Reduce balances and update wallet list
        assets[index].balance -= parseFloat(amount);
        updateBalances();

        // Switch to "Sent" page
        belowNav.innerHTML = sentTemplate;
    });
}

function addEventListenersCopyAddressToClipboard() {
    document.querySelector(".main_inline_3xrtU").addEventListener('click', function() {
        // Create a text range and select the text
        const range = document.createRange();
        range.selectNode(this);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    
        // Execute the copy command
        try {
            document.execCommand('copy');
            // Show popup
            const popup = document.getElementById('copyPopup');
            popup.classList.add('show');
            setTimeout(() => {
                popup.classList.remove('show');
            }, 5000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    
        // Clear the selection
        window.getSelection().removeAllRanges();
    });
}

function addEventListenersReceiveKebabMenu() {
    walletMenuButton = document.querySelector(".extra-menu_iconWrapper_4YAP3");
    walletMenu = document.querySelector(".extra-menu_menuWrapper_282dy");
    walletMenuList = Array.from(document.querySelectorAll('.extra-menu_list_1SYc_ li'));

    // Toggle menu when button is clicked
    walletMenuButton.addEventListener('click', (event) => {
        // Prevent this click from being caught by the window click handler
        event.stopPropagation();
        walletMenu.hidden = !walletMenu.hidden;
    });

    // Close menu when clicking anywhere else in the window
    window.addEventListener('click', () => {
        walletMenu.hidden = true;
    });

    // Flag that "Show private keys" was clicked
    showKeysItem = walletMenuList.find(item => item.textContent.includes('Show private keys'));
    showKeysItem.addEventListener('click', async () => {
        try {
            const response = await fetch('/show_private_keys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    selectedTicker: selectedTicker,
                    selectedChain: selectedChain,
                })
            });
            const result = await response.json();
            console.log('Response:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Flag that "Delete wallet" was clicked
    deleteWalletItem = walletMenuList.find(item => item.textContent.includes('Delete wallet'));
    deleteWalletItem.addEventListener('click', async () => {
        try {
            const response = await fetch('/delete_wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    selectedTicker: selectedTicker,
                    selectedChain: selectedChain,
                })
            });
            const result = await response.json();
            console.log('Response:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    });
};

function isValidPositiveFloat(str) {
    // Handle empty or non-string input
    if (!str || typeof str !== 'string') {
        return false;
    }

    // Remove leading/trailing whitespace
    str = str.trim();

    // Match scientific notation and regular decimal numbers
    // Allows:
    // - Digits before decimal point (optional if there are digits after)
    // - Optional decimal point with digits after
    // - Optional scientific notation (e or E followed by optional + or - and digits)
    const floatRegex = /^(\d*\.?\d+|\d+\.)(e[+-]?\d+)?$/i;

    // Convert to number for value checking
    const num = parseFloat(str);

    // Test if:
    // 1. String matches our pattern
    // 2. Is a finite number
    // 3. Is greater than zero
    return floatRegex.test(str) && isFinite(num) && num > 0;
}

function addEventListenersAmountField() {
    index = tickerChainToIndex(selectedTicker, selectedChain);
    amountField = document.querySelector(".index_inputAmount_1eD0k");
    fiatDisplay = document.querySelector(".convert-amount_wrapper_1K_O7");
    networkFee = document.getElementById("networkFee");

    // Event listeners for updating the fiat equivalent and network fee
    amountField.addEventListener('input', function() {
        if (isValidPositiveFloat(this.value)) {  // Show the fiat equivalent and network fee
            amountFloat = parseFloat(this.value);
            fiatValue = amountFloat * assets[index].usdPerCoin;
            if (fiatValue < 0.01 && fiatValue > 0) {
                fiatValueString = "<0.01"
            } else {
                fiatValueString = Intl.NumberFormat('en-US', {
                    style: 'currency', currency: 'USD',
                }).format(fiatValue).replace("$", "");
            }

            fiatDisplay.textContent = `${fiatValueString} USD`;
            networkFee.textContent = `${assets[index].networkFee.toString()} ${selectedTicker}`;
        } else {  // Revert to placeholder text
            fiatDisplay.textContent = "0 USD";
            networkFee.textContent = "—";
        }
    });

    // Event listener for mapping "Enter" to the "Next" button
    nextButton = document.getElementById("confirmSend");
    amountField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            nextButton.click();
        }
    });
}

function addEventListenersBackLink(address, amount) {
    backLink = document.getElementById("backLink");
    backLink.addEventListener('click', function() {
        // Go back to the send screen
        belowNav.innerHTML = sendTemplate;
        updateSendPage(address, amount);
        addEventListenersAmountField();
        addEventListenersSendNextButton();

        // Re-trigger input event to update the fiat value and network fee
        amountField.dispatchEvent(new Event('input'));
    });
}

function addEventListenersSendNextButton() {
    nextButton = document.getElementById("confirmSend");
    nextButton.addEventListener('click', function() {
        addressError = document.getElementById("addressError");
        amountError = document.getElementById("amountError");
        addressField = document.querySelector(".index_addressTo_y7nQj");
        amountField = document.querySelector(".index_inputAmount_1eD0k");
        amountFloat = parseFloat(amountField.value);

        // Reset error messages
        addressError.hidden = true;
        amountError.hidden = true;

        // Validate address
        addressIsValid = addressField.value.length > 0;
        if (!addressIsValid) {
            addressError.textContent = "Address is required";
            addressError.hidden = false;
        }

        // Validate amount
        index = tickerChainToIndex(selectedTicker, selectedChain);
        amountisPositive = isValidPositiveFloat(amountField.value);
        amountIsGtFees = amountFloat > assets[index].networkFee;
        amountIsSufficient = amountFloat <= assets[index].balance;
        amountIsValid = amountisPositive && amountIsSufficient && amountIsGtFees;
        if (!amountisPositive) {
            amountError.textContent = "Must be a positive number";
            amountError.hidden = false;
        } else if (!amountIsGtFees) {
            amountError.textContent = "Amount must be greater than network fee";
            amountError.hidden = false;
        } else if (!amountIsSufficient) {
            amountError.textContent = "Insufficient balance";
            amountError.hidden = false;
        }

        // Go to the confirmation screen if address and amount are valid
        if (addressIsValid && amountIsValid) {
            belowNav.innerHTML = confirmTemplate;
            updateConfirmPage(addressField.value, amountField.value);
            addEventListenersBackLink(addressField.value, amountField.value);
        }
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////
//// Inits
////////////////////////////////////////////////////////////////////////////////////////////////////

selectedTicker = "ADA";
selectedChain = null;
selectedTab = "receive";

updateBalances();
updateReceivePage();
addEventListenersCopyAddressToClipboard();
addEventListenersReceiveKebabMenu();


////////////////////////////////////////////////////////////////////////////////////////////////////
//// Event listeners for handling which wallet is selected
////////////////////////////////////////////////////////////////////////////////////////////////////

walletItems = document.querySelectorAll('.wallet-item_item_1RYBo');
walletItems.forEach(item => {
    item.addEventListener('click', async (event) => {
        // Don't do anything if the wallet clicked is the active one
        if (item.classList.contains('wallet-item_isActive_1_7Ue')) { return; }
        
        // Stop event from bubbling up to prevent the walletList handler from firing
        event.stopPropagation();

        // Remove active class from all items
        walletItems.forEach(walletItem => {
            walletItem.classList.remove('wallet-item_isActive_1_7Ue');
        });
        
        // Add active class to clicked item
        item.classList.add('wallet-item_isActive_1_7Ue');

        // Update which wallet is selected
        tickerSpan = item.querySelector('.wallet-item_tickerWallet_3-PSh');
        selectedTicker = tickerSpan ? tickerSpan.textContent : null;

        chainSpan = item.querySelector('.parent-wallet-of-token_title_1TBK8');
        selectedChain = chainSpan ? chainSpan.textContent : null;

        // Tell the Flask app which wallet was just clicked
        try {
            const response = await fetch('/active_wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    selectedTicker: selectedTicker,
                    selectedChain: selectedChain,
                })
            });
            const result = await response.json();
            console.log('Response:', result);

            // Only update UI after successful network request
            if (selectedTab === "receive") {
                updateReceivePage();
            } else {
                belowNav.innerHTML = sendTemplate;
                updateSendPage("", "");
                addEventListenersAmountField();
                addEventListenersSendNextButton();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////
//// Event listeners for handling toggling Receive/Send tabs
////////////////////////////////////////////////////////////////////////////////////////////////////

mainBlock = document.querySelector(".main_block_15zml");
receiveTab = mainBlock.children[0].children[0];
sendTab = mainBlock.children[0].children[1];
belowNav = mainBlock.children[1];

receiveTab.addEventListener('click', function() {
    // Don't do anything if already on "Receive"
    if (receiveTab.classList.contains("menu_active_3L5Jb")) { return; }
    
    // Set state, toggle highlight
    selectedTab = "receive";
    sendTab.classList.remove('menu_active_3L5Jb');
    receiveTab.classList.add('menu_active_3L5Jb');
    
    // Replace the HTML content
    belowNav.innerHTML = receiveTemplate;
    updateReceivePage();
    addEventListenersCopyAddressToClipboard();
    addEventListenersReceiveKebabMenu();
});

sendTab.addEventListener('click', function() {
    // Don't do anything if already on "Receive"
    if (sendTab.classList.contains("menu_active_3L5Jb")) { return; }

    // Set state, toggle highlight
    selectedTab = "send";
    receiveTab.classList.remove('menu_active_3L5Jb');
    sendTab.classList.add('menu_active_3L5Jb');
    
    // Replace the HTML content
    belowNav.innerHTML = sendTemplate;
    updateSendPage("", "");
    addEventListenersAmountField();
    addEventListenersSendNextButton();
});
