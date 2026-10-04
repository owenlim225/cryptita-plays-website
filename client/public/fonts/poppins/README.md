# Poppins Latin web fonts

Retrieved 5 October 2026 from the official Google Fonts CSS2 response for `Poppins:wght@400;500;600;700;800&display=swap`, using a Chrome browser user agent. These are unchanged WOFF2 Latin subset files, served locally under the accompanying SIL Open Font License 1.1.

License source: https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/OFL.txt
Font authors: The Poppins Project Authors, https://github.com/itfoundry/Poppins

| Local file | Official source | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| poppins-latin-400.woff2 | https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrJJfecg.woff2 | 7884 | 7d93459d86585bfcdbb7e0376056226adb25821ee54b96236fe2123e9560929f |
| poppins-latin-500.woff2 | https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2 | 7748 | cd36de204aca2d5fa263a731f7c20009b5e3d754ba1f1e03c33e93a48f3e7446 |
| poppins-latin-600.woff2 | https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2 | 8000 | f4e80d9dfd374d02989b87a27b5ed4cb78fbb177c27f1478e9a8b0afb7513149 |
| poppins-latin-700.woff2 | https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2 | 7816 | 9338e65fc077355c7a87ae0d64cc101e23b9bf8ad78ae65f0f319c857311b526 |
| poppins-latin-800.woff2 | https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2 | 7824 | 60bf0aba6526436f3930c58c12047687fbb6bff4dd180cce4613458ed3439ea2 |

Only 400 (body) and 700 (hero heading) are preloaded because both are used above the fold. Other weights load when used. `font-display: swap` preserves the intended Poppins appearance once loaded; same-origin preloading removes the former Google stylesheet/connection dependency but cannot promise no late swap on every connection. Latin coverage matches the English-only site; unprovided glyphs fall back to the configured sans-serif.
