(function() {
    document.addEventListener("DOMContentLoaded", function() {
        var e = "dmca-badge";
        var t = "refurl";
        var n = document.querySelectorAll('a.' + e);
        if (n[0].getAttribute("href").indexOf("refurl") < 0) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.href = i.href + (i.href.indexOf("?") === -1 ? "?" : "&") + t + "=" + document.location
            }
        }
    }, !1)
}
)();
(()=>{
    "use strict";
    var t = {
        d: (e,s)=>{
            for (var i in s)
                t.o(s, i) && !t.o(e, i) && Object.defineProperty(e, i, {
                    enumerable: !0,
                    get: s[i]
                })
        }
        ,
        o: (t,e)=>Object.prototype.hasOwnProperty.call(t, e),
        r: t=>{
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
    }
      , e = {};
    function s(t) {
        if (this.formData = {},
        this.tree = {},
        !(t instanceof FormData))
            return this;
        this.formData = t;
        const e = ()=>{
            const t = new Map;
            return t.largestIndex = 0,
            t.set = function(e, s) {
                "" === e ? e = t.largestIndex++ : /^[0-9]+$/.test(e) && (e = parseInt(e),
                t.largestIndex <= e && (t.largestIndex = e + 1)),
                Map.prototype.set.call(t, e, s)
            }
            ,
            t
        }
        ;
        this.tree = e();
        const s = /^(?<name>[a-z][-a-z0-9_:]*)(?<array>(?:\[(?:[a-z][-a-z0-9_:]*|[0-9]*)\])*)/i;
        for (const [t,i] of this.formData) {
            const o = t.match(s);
            if (o)
                if ("" === o.groups.array)
                    this.tree.set(o.groups.name, i);
                else {
                    const t = [...o.groups.array.matchAll(/\[([a-z][-a-z0-9_:]*|[0-9]*)\]/gi)].map((([t,e])=>e));
                    t.unshift(o.groups.name);
                    const s = t.pop();
                    t.reduce(((t,s)=>{
                        if (/^[0-9]+$/.test(s) && (s = parseInt(s)),
                        t.get(s)instanceof Map)
                            return t.get(s);
                        const i = e();
                        return t.set(s, i),
                        i
                    }
                    ), this.tree).set(s, i)
                }
        }
    }
    t.r(e),
    t.d(e, {
        date: ()=>d,
        email: ()=>r,
        enum: ()=>f,
        file: ()=>m,
        maxdate: ()=>b,
        maxfilesize: ()=>z,
        maxitems: ()=>u,
        maxlength: ()=>v,
        maxnumber: ()=>x,
        mindate: ()=>y,
        minfilesize: ()=>A,
        minitems: ()=>h,
        minlength: ()=>g,
        minnumber: ()=>w,
        number: ()=>c,
        required: ()=>n,
        requiredfile: ()=>a,
        tel: ()=>l,
        url: ()=>p
    }),
    s.prototype.entries = function() {
        return this.tree.entries()
    }
    ,
    s.prototype.get = function(t) {
        return this.tree.get(t)
    }
    ,
    s.prototype.getAll = function(t) {
        if (!this.has(t))
            return [];
        const e = t=>{
            const s = [];
            if (t instanceof Map)
                for (const [i,o] of t)
                    s.push(...e(o));
            else
                "" !== t && s.push(t);
            return s
        }
        ;
        return e(this.get(t))
    }
    ,
    s.prototype.has = function(t) {
        return this.tree.has(t)
    }
    ,
    s.prototype.keys = function() {
        return this.tree.keys()
    }
    ,
    s.prototype.values = function() {
        return this.tree.values()
    }
    ;
    const i = s;
    function o({rule: t, field: e, error: s, ...i}) {
        this.rule = t,
        this.field = e,
        this.error = s,
        this.properties = i
    }
    const n = function(t) {
        if (0 === t.getAll(this.field).length)
            throw new o(this)
    }
      , a = function(t) {
        if (0 === t.getAll(this.field).length)
            throw new o(this)
    }
      , r = function(t) {
        if (!t.getAll(this.field).every((t=>{
            if ((t = t.trim()).length < 6)
                return !1;
            if (-1 === t.indexOf("@", 1))
                return !1;
            if (t.indexOf("@") !== t.lastIndexOf("@"))
                return !1;
            const [e,s] = t.split("@", 2);
            if (!/^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~\.-]+$/.test(e))
                return !1;
            if (/\.{2,}/.test(s))
                return !1;
            if (/(?:^[ \t\n\r\0\x0B.]|[ \t\n\r\0\x0B.]$)/.test(s))
                return !1;
            const i = s.split(".");
            if (i.length < 2)
                return !1;
            for (const t of i) {
                if (/(?:^[ \t\n\r\0\x0B-]|[ \t\n\r\0\x0B-]$)/.test(t))
                    return !1;
                if (!/^[a-z0-9-]+$/i.test(t))
                    return !1
            }
            return !0
        }
        )))
            throw new o(this)
    }
      , p = function(t) {
        const e = t.getAll(this.field);
        if (!e.every((t=>{
            if ("" === (t = t.trim()))
                return !1;
            try {
                return (t=>-1 !== ["http", "https", "ftp", "ftps", "mailto", "news", "irc", "irc6", "ircs", "gopher", "nntp", "feed", "telnet", "mms", "rtsp", "sms", "svn", "tel", "fax", "xmpp", "webcal", "urn"].indexOf(t))(new URL(t).protocol.replace(/:$/, ""))
            } catch {
                return !1
            }
        }
        )))
            throw new o(this)
    }
      , l = function(t) {
        if (!t.getAll(this.field).every((t=>(t = (t = t.trim()).replaceAll(/[()/.*#\s-]+/g, ""),
        /^[+]?[0-9]+$/.test(t)))))
            throw new o(this)
    }
      , c = function(t) {
        if (!t.getAll(this.field).every((t=>(t = t.trim(),
        !!/^[-]?[0-9]+(?:[eE][+-]?[0-9]+)?$/.test(t) || !!/^[-]?(?:[0-9]+)?[.][0-9]+(?:[eE][+-]?[0-9]+)?$/.test(t)))))
            throw new o(this)
    }
      , d = function(t) {
        if (!t.getAll(this.field).every((t=>/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t.trim()))))
            throw new o(this)
    }
      , m = function(t) {
        if (!t.getAll(this.field).every((t=>t instanceof File && this.accept?.some((e=>/^\.[a-z0-9]+$/i.test(e) ? t.name.toLowerCase().endsWith(e.toLowerCase()) : (t=>{
            const e = []
              , s = t.match(/^(?<toplevel>[a-z]+)\/(?<sub>[*]|[a-z0-9.+-]+)$/i);
            if (s) {
                const t = s.groups.toplevel.toLowerCase()
                  , i = s.groups.sub.toLowerCase();
                for (const [o,n] of (()=>{
                    const t = new Map;
                    return t.set("jpg|jpeg|jpe", "image/jpeg"),
                    t.set("gif", "image/gif"),
                    t.set("png", "image/png"),
                    t.set("bmp", "image/bmp"),
                    t.set("tiff|tif", "image/tiff"),
                    t.set("webp", "image/webp"),
                    t.set("ico", "image/x-icon"),
                    t.set("heic", "image/heic"),
                    t.set("asf|asx", "video/x-ms-asf"),
                    t.set("wmv", "video/x-ms-wmv"),
                    t.set("wmx", "video/x-ms-wmx"),
                    t.set("wm", "video/x-ms-wm"),
                    t.set("avi", "video/avi"),
                    t.set("divx", "video/divx"),
                    t.set("flv", "video/x-flv"),
                    t.set("mov|qt", "video/quicktime"),
                    t.set("mpeg|mpg|mpe", "video/mpeg"),
                    t.set("mp4|m4v", "video/mp4"),
                    t.set("ogv", "video/ogg"),
                    t.set("webm", "video/webm"),
                    t.set("mkv", "video/x-matroska"),
                    t.set("3gp|3gpp", "video/3gpp"),
                    t.set("3g2|3gp2", "video/3gpp2"),
                    t.set("txt|asc|c|cc|h|srt", "text/plain"),
                    t.set("csv", "text/csv"),
                    t.set("tsv", "text/tab-separated-values"),
                    t.set("ics", "text/calendar"),
                    t.set("rtx", "text/richtext"),
                    t.set("css", "text/css"),
                    t.set("htm|html", "text/html"),
                    t.set("vtt", "text/vtt"),
                    t.set("dfxp", "application/ttaf+xml"),
                    t.set("mp3|m4a|m4b", "audio/mpeg"),
                    t.set("aac", "audio/aac"),
                    t.set("ra|ram", "audio/x-realaudio"),
                    t.set("wav", "audio/wav"),
                    t.set("ogg|oga", "audio/ogg"),
                    t.set("flac", "audio/flac"),
                    t.set("mid|midi", "audio/midi"),
                    t.set("wma", "audio/x-ms-wma"),
                    t.set("wax", "audio/x-ms-wax"),
                    t.set("mka", "audio/x-matroska"),
                    t.set("rtf", "application/rtf"),
                    t.set("js", "application/javascript"),
                    t.set("pdf", "application/pdf"),
                    t.set("swf", "application/x-shockwave-flash"),
                    t.set("class", "application/java"),
                    t.set("tar", "application/x-tar"),
                    t.set("zip", "application/zip"),
                    t.set("gz|gzip", "application/x-gzip"),
                    t.set("rar", "application/rar"),
                    t.set("7z", "application/x-7z-compressed"),
                    t.set("exe", "application/x-msdownload"),
                    t.set("psd", "application/octet-stream"),
                    t.set("xcf", "application/octet-stream"),
                    t.set("doc", "application/msword"),
                    t.set("pot|pps|ppt", "application/vnd.ms-powerpoint"),
                    t.set("wri", "application/vnd.ms-write"),
                    t.set("xla|xls|xlt|xlw", "application/vnd.ms-excel"),
                    t.set("mdb", "application/vnd.ms-access"),
                    t.set("mpp", "application/vnd.ms-project"),
                    t.set("docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
                    t.set("docm", "application/vnd.ms-word.document.macroEnabled.12"),
                    t.set("dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"),
                    t.set("dotm", "application/vnd.ms-word.template.macroEnabled.12"),
                    t.set("xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
                    t.set("xlsm", "application/vnd.ms-excel.sheet.macroEnabled.12"),
                    t.set("xlsb", "application/vnd.ms-excel.sheet.binary.macroEnabled.12"),
                    t.set("xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"),
                    t.set("xltm", "application/vnd.ms-excel.template.macroEnabled.12"),
                    t.set("xlam", "application/vnd.ms-excel.addin.macroEnabled.12"),
                    t.set("pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"),
                    t.set("pptm", "application/vnd.ms-powerpoint.presentation.macroEnabled.12"),
                    t.set("ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"),
                    t.set("ppsm", "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"),
                    t.set("potx", "application/vnd.openxmlformats-officedocument.presentationml.template"),
                    t.set("potm", "application/vnd.ms-powerpoint.template.macroEnabled.12"),
                    t.set("ppam", "application/vnd.ms-powerpoint.addin.macroEnabled.12"),
                    t.set("sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"),
                    t.set("sldm", "application/vnd.ms-powerpoint.slide.macroEnabled.12"),
                    t.set("onetoc|onetoc2|onetmp|onepkg", "application/onenote"),
                    t.set("oxps", "application/oxps"),
                    t.set("xps", "application/vnd.ms-xpsdocument"),
                    t.set("odt", "application/vnd.oasis.opendocument.text"),
                    t.set("odp", "application/vnd.oasis.opendocument.presentation"),
                    t.set("ods", "application/vnd.oasis.opendocument.spreadsheet"),
                    t.set("odg", "application/vnd.oasis.opendocument.graphics"),
                    t.set("odc", "application/vnd.oasis.opendocument.chart"),
                    t.set("odb", "application/vnd.oasis.opendocument.database"),
                    t.set("odf", "application/vnd.oasis.opendocument.formula"),
                    t.set("wp|wpd", "application/wordperfect"),
                    t.set("key", "application/vnd.apple.keynote"),
                    t.set("numbers", "application/vnd.apple.numbers"),
                    t.set("pages", "application/vnd.apple.pages"),
                    t
                }
                )())
                    ("*" === i && n.startsWith(t + "/") || n === s[0]) && e.push(...o.split("|"))
            }
            return e
        }
        )(e).some((e=>(e = "." + e.trim(),
        t.name.toLowerCase().endsWith(e.toLowerCase())))))))))
            throw new o(this)
    }
      , f = function(t) {
        if (!t.getAll(this.field).every((t=>this.accept?.some((e=>t === String(e))))))
            throw new o(this)
    }
      , h = function(t) {
        if (t.getAll(this.field).length < parseInt(this.threshold))
            throw new o(this)
    }
      , u = function(t) {
        const e = t.getAll(this.field);
        if (parseInt(this.threshold) < e.length)
            throw new o(this)
    }
      , g = function(t) {
        const e = t.getAll(this.field);
        let s = 0;
        if (e.forEach((t=>{
            "string" == typeof t && (s += t.length)
        }
        )),
        0 !== s && s < parseInt(this.threshold))
            throw new o(this)
    }
      , v = function(t) {
        const e = t.getAll(this.field);
        let s = 0;
        if (e.forEach((t=>{
            "string" == typeof t && (s += t.length)
        }
        )),
        parseInt(this.threshold) < s)
            throw new o(this)
    }
      , w = function(t) {
        if (!t.getAll(this.field).every((t=>!(parseFloat(t) < parseFloat(this.threshold)))))
            throw new o(this)
    }
      , x = function(t) {
        if (!t.getAll(this.field).every((t=>!(parseFloat(this.threshold) < parseFloat(t)))))
            throw new o(this)
    }
      , y = function(t) {
        if (!t.getAll(this.field).every((t=>(t = t.trim(),
        !(/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t) && /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(this.threshold) && t < this.threshold)))))
            throw new o(this)
    }
      , b = function(t) {
        if (!t.getAll(this.field).every((t=>(t = t.trim(),
        !(/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t) && /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(this.threshold) && this.threshold < t)))))
            throw new o(this)
    }
      , A = function(t) {
        const e = t.getAll(this.field);
        let s = 0;
        if (e.forEach((t=>{
            t instanceof File && (s += t.size)
        }
        )),
        s < parseInt(this.threshold))
            throw new o(this)
    }
      , z = function(t) {
        const e = t.getAll(this.field);
        let s = 0;
        if (e.forEach((t=>{
            t instanceof File && (s += t.size)
        }
        )),
        parseInt(this.threshold) < s)
            throw new o(this)
    };
    var $;
    window.swv = {
        validators: e,
        validate: (t,s,n={})=>{
            const a = (t.rules ?? []).filter((({rule: t, ...s})=>"function" == typeof e[t] && ("function" != typeof e[t].matches || e[t].matches(s, n))));
            if (!a.length)
                return new Map;
            const r = new i(s)
              , p = a.reduce(((t,s)=>{
                const {rule: i, ...n} = s;
                if (t.get(n.field)?.error)
                    return t;
                try {
                    e[i].call({
                        rule: i,
                        ...n
                    }, r)
                } catch (e) {
                    if (e instanceof o)
                        return t.set(n.field, e)
                }
                return t
            }
            ), new Map);
            for (const t of r.keys())
                p.has(t) || p.set(t, {
                    validInputs: r.getAll(t)
                });
            return p
        }
        ,
        ...null !== ($ = window.swv) && void 0 !== $ ? $ : {}
    }
}
)();
var wpcf7 = {
    "api": {
        "root": "https:\/\/motogo.vn\/wp-json\/",
        "namespace": "contact-form-7\/v1"
    },
    "cached": "1"
};
(()=>{
    "use strict";
    const e = e=>Math.abs(parseInt(e, 10))
      , t = (e,t)=>{
        const a = new Map([["init", "init"], ["validation_failed", "invalid"], ["acceptance_missing", "unaccepted"], ["spam", "spam"], ["aborted", "aborted"], ["mail_sent", "sent"], ["mail_failed", "failed"], ["submitting", "submitting"], ["resetting", "resetting"], ["validating", "validating"], ["payment_required", "payment-required"]]);
        a.has(t) && (t = a.get(t)),
        Array.from(a.values()).includes(t) || (t = `custom-${t = (t = t.replace(/[^0-9a-z]+/i, " ").trim()).replace(/\s+/, "-")}`);
        const n = e.getAttribute("data-status");
        return e.wpcf7.status = t,
        e.setAttribute("data-status", t),
        e.classList.add(t),
        n && n !== t && e.classList.remove(n),
        t
    }
      , a = (e,t,a)=>{
        const n = new CustomEvent(`wpcf7${t}`,{
            bubbles: !0,
            detail: a
        });
        "string" == typeof e && (e = document.querySelector(e)),
        e.dispatchEvent(n)
    }
      , n = e=>{
        const {root: t, namespace: a="contact-form-7/v1"} = wpcf7.api;
        return r.reduceRight(((e,t)=>a=>t(a, e)), (e=>{
            let n, r, {url: o, path: c, endpoint: s, headers: i, body: l, data: d, ...p} = e;
            "string" == typeof s && (n = a.replace(/^\/|\/$/g, ""),
            r = s.replace(/^\//, ""),
            c = r ? n + "/" + r : n),
            "string" == typeof c && (-1 !== t.indexOf("?") && (c = c.replace("?", "&")),
            c = c.replace(/^\//, ""),
            o = t + c),
            i = {
                Accept: "application/json, */*;q=0.1",
                ...i
            },
            delete i["X-WP-Nonce"],
            d && (l = JSON.stringify(d),
            i["Content-Type"] = "application/json");
            const u = {
                code: "fetch_error",
                message: "You are probably offline."
            }
              , f = {
                code: "invalid_json",
                message: "The response is not a valid JSON response."
            };
            return window.fetch(o || c || window.location.href, {
                ...p,
                headers: i,
                body: l
            }).then((e=>Promise.resolve(e).then((e=>{
                if (e.status >= 200 && e.status < 300)
                    return e;
                throw e
            }
            )).then((e=>{
                if (204 === e.status)
                    return null;
                if (e && e.json)
                    return e.json().catch((()=>{
                        throw f
                    }
                    ));
                throw f
            }
            ))), (()=>{
                throw u
            }
            ))
        }
        ))(e)
    }
      , r = [];
    function o(e) {
        var a, n;
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        const {target: o, scope: l=e, ...d} = r;
        if (void 0 === (null === (a = e.wpcf7) || void 0 === a ? void 0 : a.schema))
            return;
        const p = {
            ...e.wpcf7.schema
        };
        if (void 0 !== o) {
            if (!e.contains(o))
                return;
            if (!o.closest(".wpcf7-form-control-wrap[data-name]"))
                return;
            if (o.closest(".novalidate"))
                return
        }
        const u = new FormData
          , f = [];
        for (const e of l.querySelectorAll(".wpcf7-form-control-wrap"))
            if (!e.closest(".novalidate") && (e.querySelectorAll(":where( input, textarea, select ):enabled").forEach((e=>{
                if (e.name)
                    switch (e.type) {
                    case "button":
                    case "image":
                    case "reset":
                    case "submit":
                        break;
                    case "checkbox":
                    case "radio":
                        e.checked && u.append(e.name, e.value);
                        break;
                    case "select-multiple":
                        for (const t of e.selectedOptions)
                            u.append(e.name, t.value);
                        break;
                    case "file":
                        for (const t of e.files)
                            u.append(e.name, t);
                        break;
                    default:
                        u.append(e.name, e.value)
                    }
            }
            )),
            e.dataset.name && (f.push(e.dataset.name),
            e.setAttribute("data-under-validation", "1"),
            e.contains(o))))
                break;
        p.rules = (null !== (n = p.rules) && void 0 !== n ? n : []).filter((e=>{
            let {field: t} = e;
            return f.includes(t)
        }
        ));
        const m = e.getAttribute("data-status");
        Promise.resolve(t(e, "validating")).then((t=>{
            if (void 0 !== swv) {
                const t = swv.validate(p, u, r);
                for (const [a,{error: n, validInputs: r}] of t)
                    s(e, a),
                    void 0 !== n && c(e, a, n, {
                        scope: l
                    }),
                    i(e, a, null != r ? r : [])
            }
        }
        )).finally((()=>{
            t(e, m),
            e.querySelectorAll(".wpcf7-form-control-wrap[data-under-validation]").forEach((e=>{
                e.removeAttribute("data-under-validation")
            }
            ))
        }
        ))
    }
    n.use = e=>{
        r.unshift(e)
    }
    ;
    const c = (e,t,a,n)=>{
        var r;
        const {scope: o=e, ...c} = null != n ? n : {}
          , s = `${null === (r = e.wpcf7) || void 0 === r ? void 0 : r.unitTag}-ve-${t}`.replaceAll(/[^0-9a-z_-]+/gi, "")
          , i = e.querySelector(`.wpcf7-form-control-wrap[data-name="${t}"] .wpcf7-form-control`);
        (()=>{
            const t = document.createElement("li");
            t.setAttribute("id", s),
            i && i.id ? t.insertAdjacentHTML("beforeend", `<a href="#${i.id}">${a}</a>`) : t.insertAdjacentText("beforeend", a),
            e.wpcf7.parent.querySelector(".screen-reader-response ul").appendChild(t)
        }
        )(),
        o.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${t}"]`).forEach((t=>{
            if ("validating" === e.getAttribute("data-status") && !t.dataset.underValidation)
                return;
            const n = document.createElement("span");
            n.classList.add("wpcf7-not-valid-tip"),
            n.setAttribute("aria-hidden", "true"),
            n.insertAdjacentText("beforeend", a),
            t.appendChild(n),
            t.querySelectorAll("[aria-invalid]").forEach((e=>{
                e.setAttribute("aria-invalid", "true")
            }
            )),
            t.querySelectorAll(".wpcf7-form-control").forEach((e=>{
                e.classList.add("wpcf7-not-valid"),
                e.setAttribute("aria-describedby", s),
                "function" == typeof e.setCustomValidity && e.setCustomValidity(a),
                e.closest(".use-floating-validation-tip") && (e.addEventListener("focus", (e=>{
                    n.setAttribute("style", "display: none")
                }
                )),
                n.addEventListener("click", (e=>{
                    n.setAttribute("style", "display: none")
                }
                )))
            }
            ))
        }
        ))
    }
      , s = (e,t)=>{
        var a, n;
        const r = `${null === (a = e.wpcf7) || void 0 === a ? void 0 : a.unitTag}-ve-${t}`.replaceAll(/[^0-9a-z_-]+/gi, "");
        null === (n = e.wpcf7.parent.querySelector(`.screen-reader-response ul li#${r}`)) || void 0 === n || n.remove(),
        e.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${t}"]`).forEach((e=>{
            var t;
            null === (t = e.querySelector(".wpcf7-not-valid-tip")) || void 0 === t || t.remove(),
            e.querySelectorAll("[aria-invalid]").forEach((e=>{
                e.setAttribute("aria-invalid", "false")
            }
            )),
            e.querySelectorAll(".wpcf7-form-control").forEach((e=>{
                e.removeAttribute("aria-describedby"),
                e.classList.remove("wpcf7-not-valid"),
                "function" == typeof e.setCustomValidity && e.setCustomValidity("")
            }
            ))
        }
        ))
    }
      , i = (e,t,a)=>{
        e.querySelectorAll(`[data-reflection-of="${t}"]`).forEach((e=>{
            if ("output" === e.tagName.toLowerCase()) {
                const t = e;
                0 === a.length && a.push(t.dataset.default),
                a.slice(0, 1).forEach((e=>{
                    e instanceof File && (e = e.name),
                    t.textContent = e
                }
                ))
            } else
                e.querySelectorAll("output").forEach((e=>{
                    e.hasAttribute("data-default") ? 0 === a.length ? e.removeAttribute("hidden") : e.setAttribute("hidden", "hidden") : e.remove()
                }
                )),
                a.forEach((a=>{
                    a instanceof File && (a = a.name);
                    const n = document.createElement("output");
                    n.setAttribute("name", t),
                    n.textContent = a,
                    e.appendChild(n)
                }
                ))
        }
        ))
    }
    ;
    function l(e) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (wpcf7.blocked)
            return d(e),
            void t(e, "submitting");
        const o = new FormData(e);
        r.submitter && r.submitter.name && o.append(r.submitter.name, r.submitter.value);
        const s = {
            contactFormId: e.wpcf7.id,
            pluginVersion: e.wpcf7.pluginVersion,
            contactFormLocale: e.wpcf7.locale,
            unitTag: e.wpcf7.unitTag,
            containerPostId: e.wpcf7.containerPost,
            status: e.wpcf7.status,
            inputs: Array.from(o, (e=>{
                const t = e[0]
                  , a = e[1];
                return !t.match(/^_/) && {
                    name: t,
                    value: a
                }
            }
            )).filter((e=>!1 !== e)),
            formData: o
        };
        n({
            endpoint: `contact-forms/${e.wpcf7.id}/feedback`,
            method: "POST",
            body: o,
            wpcf7: {
                endpoint: "feedback",
                form: e,
                detail: s
            }
        }).then((n=>{
            const r = t(e, n.status);
            return s.status = n.status,
            s.apiResponse = n,
            ["invalid", "unaccepted", "spam", "aborted"].includes(r) ? a(e, r, s) : ["sent", "failed"].includes(r) && a(e, `mail${r}`, s),
            a(e, "submit", s),
            n
        }
        )).then((t=>{
            t.posted_data_hash && (e.querySelector('input[name="_wpcf7_posted_data_hash"]').value = t.posted_data_hash),
            "mail_sent" === t.status && (e.reset(),
            e.wpcf7.resetOnMailSent = !0),
            t.invalid_fields && t.invalid_fields.forEach((t=>{
                c(e, t.field, t.message)
            }
            )),
            e.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').insertAdjacentText("beforeend", t.message),
            e.querySelectorAll(".wpcf7-response-output").forEach((e=>{
                e.innerText = t.message
            }
            ))
        }
        )).catch((e=>console.error(e)))
    }
    n.use(((e,n)=>{
        if (e.wpcf7 && "feedback" === e.wpcf7.endpoint) {
            const {form: n, detail: r} = e.wpcf7;
            d(n),
            a(n, "beforesubmit", r),
            t(n, "submitting")
        }
        return n(e)
    }
    ));
    const d = e=>{
        e.querySelectorAll(".wpcf7-form-control-wrap").forEach((t=>{
            t.dataset.name && s(e, t.dataset.name)
        }
        )),
        e.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').innerText = "",
        e.querySelectorAll(".wpcf7-response-output").forEach((e=>{
            e.innerText = ""
        }
        ))
    }
    ;
    function p(e) {
        const r = new FormData(e)
          , o = {
            contactFormId: e.wpcf7.id,
            pluginVersion: e.wpcf7.pluginVersion,
            contactFormLocale: e.wpcf7.locale,
            unitTag: e.wpcf7.unitTag,
            containerPostId: e.wpcf7.containerPost,
            status: e.wpcf7.status,
            inputs: Array.from(r, (e=>{
                const t = e[0]
                  , a = e[1];
                return !t.match(/^_/) && {
                    name: t,
                    value: a
                }
            }
            )).filter((e=>!1 !== e)),
            formData: r
        };
        n({
            endpoint: `contact-forms/${e.wpcf7.id}/refill`,
            method: "GET",
            wpcf7: {
                endpoint: "refill",
                form: e,
                detail: o
            }
        }).then((n=>{
            e.wpcf7.resetOnMailSent ? (delete e.wpcf7.resetOnMailSent,
            t(e, "mail_sent")) : t(e, "init"),
            o.apiResponse = n,
            a(e, "reset", o)
        }
        )).catch((e=>console.error(e)))
    }
    n.use(((e,a)=>{
        if (e.wpcf7 && "refill" === e.wpcf7.endpoint) {
            const {form: a, detail: n} = e.wpcf7;
            d(a),
            t(a, "resetting")
        }
        return a(e)
    }
    ));
    const u = (e,t)=>{
        for (const a in t) {
            const n = t[a];
            e.querySelectorAll(`input[name="${a}"]`).forEach((e=>{
                e.value = ""
            }
            )),
            e.querySelectorAll(`img.wpcf7-captcha-${a.replaceAll(":", "")}`).forEach((e=>{
                e.setAttribute("src", n)
            }
            ));
            const r = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
            r && e.querySelectorAll(`input[name="_wpcf7_captcha_challenge_${a}"]`).forEach((e=>{
                e.value = r[1]
            }
            ))
        }
    }
      , f = (e,t)=>{
        for (const a in t) {
            const n = t[a][0]
              , r = t[a][1];
            e.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${a}"]`).forEach((e=>{
                e.querySelector(`input[name="${a}"]`).value = "",
                e.querySelector(".wpcf7-quiz-label").textContent = n,
                e.querySelector(`input[name="_wpcf7_quiz_answer_${a}"]`).value = r
            }
            ))
        }
    }
    ;
    function m(t) {
        const a = new FormData(t);
        t.wpcf7 = {
            id: e(a.get("_wpcf7")),
            status: t.getAttribute("data-status"),
            pluginVersion: a.get("_wpcf7_version"),
            locale: a.get("_wpcf7_locale"),
            unitTag: a.get("_wpcf7_unit_tag"),
            containerPost: e(a.get("_wpcf7_container_post")),
            parent: t.closest(".wpcf7"),
            schema: void 0
        },
        t.querySelectorAll(".has-spinner").forEach((e=>{
            e.insertAdjacentHTML("afterend", '<span class="wpcf7-spinner"></span>')
        }
        )),
        (e=>{
            e.querySelectorAll(".wpcf7-exclusive-checkbox").forEach((t=>{
                t.addEventListener("change", (t=>{
                    const a = t.target.getAttribute("name");
                    e.querySelectorAll(`input[type="checkbox"][name="${a}"]`).forEach((e=>{
                        e !== t.target && (e.checked = !1)
                    }
                    ))
                }
                ))
            }
            ))
        }
        )(t),
        (e=>{
            e.querySelectorAll(".has-free-text").forEach((t=>{
                const a = t.querySelector("input.wpcf7-free-text")
                  , n = t.querySelector('input[type="checkbox"], input[type="radio"]');
                a.disabled = !n.checked,
                e.addEventListener("change", (e=>{
                    a.disabled = !n.checked,
                    e.target === n && n.checked && a.focus()
                }
                ))
            }
            ))
        }
        )(t),
        (e=>{
            e.querySelectorAll(".wpcf7-validates-as-url").forEach((e=>{
                e.addEventListener("change", (t=>{
                    let a = e.value.trim();
                    a && !a.match(/^[a-z][a-z0-9.+-]*:/i) && -1 !== a.indexOf(".") && (a = a.replace(/^\/+/, ""),
                    a = "http://" + a),
                    e.value = a
                }
                ))
            }
            ))
        }
        )(t),
        (e=>{
            if (!e.querySelector(".wpcf7-acceptance") || e.classList.contains("wpcf7-acceptance-as-validation"))
                return;
            const t = ()=>{
                let t = !0;
                e.querySelectorAll(".wpcf7-acceptance").forEach((e=>{
                    if (!t || e.classList.contains("optional"))
                        return;
                    const a = e.querySelector('input[type="checkbox"]');
                    (e.classList.contains("invert") && a.checked || !e.classList.contains("invert") && !a.checked) && (t = !1)
                }
                )),
                e.querySelectorAll(".wpcf7-submit").forEach((e=>{
                    e.disabled = !t
                }
                ))
            }
            ;
            t(),
            e.addEventListener("change", (e=>{
                t()
            }
            )),
            e.addEventListener("wpcf7reset", (e=>{
                t()
            }
            ))
        }
        )(t),
        (t=>{
            const a = (t,a)=>{
                const n = e(t.getAttribute("data-starting-value"))
                  , r = e(t.getAttribute("data-maximum-value"))
                  , o = e(t.getAttribute("data-minimum-value"))
                  , c = t.classList.contains("down") ? n - a.value.length : a.value.length;
                t.setAttribute("data-current-value", c),
                t.innerText = c,
                r && r < a.value.length ? t.classList.add("too-long") : t.classList.remove("too-long"),
                o && a.value.length < o ? t.classList.add("too-short") : t.classList.remove("too-short")
            }
              , n = e=>{
                e = {
                    init: !1,
                    ...e
                },
                t.querySelectorAll(".wpcf7-character-count").forEach((n=>{
                    const r = n.getAttribute("data-target-name")
                      , o = t.querySelector(`[name="${r}"]`);
                    o && (o.value = o.defaultValue,
                    a(n, o),
                    e.init && o.addEventListener("keyup", (e=>{
                        a(n, o)
                    }
                    )))
                }
                ))
            }
            ;
            n({
                init: !0
            }),
            t.addEventListener("wpcf7reset", (e=>{
                n()
            }
            ))
        }
        )(t),
        window.addEventListener("load", (e=>{
            wpcf7.cached && t.reset()
        }
        )),
        t.addEventListener("reset", (e=>{
            wpcf7.reset(t)
        }
        )),
        t.addEventListener("submit", (e=>{
            wpcf7.submit(t, {
                submitter: e.submitter
            }),
            e.preventDefault()
        }
        )),
        t.addEventListener("wpcf7submit", (e=>{
            e.detail.apiResponse.captcha && u(t, e.detail.apiResponse.captcha),
            e.detail.apiResponse.quiz && f(t, e.detail.apiResponse.quiz)
        }
        )),
        t.addEventListener("wpcf7reset", (e=>{
            e.detail.apiResponse.captcha && u(t, e.detail.apiResponse.captcha),
            e.detail.apiResponse.quiz && f(t, e.detail.apiResponse.quiz)
        }
        )),
        n({
            endpoint: `contact-forms/${t.wpcf7.id}/feedback/schema`,
            method: "GET"
        }).then((e=>{
            t.wpcf7.schema = e
        }
        )),
        t.addEventListener("change", (e=>{
            e.target.closest(".wpcf7-form-control") && wpcf7.validate(t, {
                target: e.target
            })
        }
        ))
    }
    document.addEventListener("DOMContentLoaded", (e=>{
        var t;
        "undefined" != typeof wpcf7 ? void 0 !== wpcf7.api ? "function" == typeof window.fetch ? "function" == typeof window.FormData ? "function" == typeof NodeList.prototype.forEach ? "function" == typeof String.prototype.replaceAll ? (wpcf7 = {
            init: m,
            submit: l,
            reset: p,
            validate: o,
            ...null !== (t = wpcf7) && void 0 !== t ? t : {}
        },
        document.querySelectorAll(".wpcf7 > form").forEach((e=>{
            wpcf7.init(e),
            e.closest(".wpcf7").classList.replace("no-js", "js")
        }
        ))) : console.error("Your browser does not support String.replaceAll().") : console.error("Your browser does not support NodeList.forEach().") : console.error("Your browser does not support window.FormData().") : console.error("Your browser does not support window.fetch().") : console.error("wpcf7.api is not defined.") : console.error("wpcf7 is not defined.")
    }
    ))
}
)();
var hqRentalsBrands = [{
    "id": "1",
    "name": "Quy Nh\u01a1n",
    "iframePageURL": "",
    "locations": []
}, {
    "id": "2",
    "name": "H\u00e0 N\u1ed9i",
    "iframePageURL": "",
    "locations": [{
        "id": "3",
        "name": "1081 H\u1ed3ng H\u00e0, Ho\u00e0n Ki\u1ebfm, H\u00e0 N\u1ed9i",
        "coordinates": "",
        "label": "1081 H\u1ed3ng H\u00e0, Ho\u00e0n Ki\u1ebfm, H\u00e0 N\u1ed9i"
    }, {
        "id": "4",
        "name": "81 Nguy\u1ec5n Kh\u1ea3 Tr\u1ea1c, Mai D\u1ecbch, C\u1ea7u Gi\u1ea5y, H\u00e0 N\u1ed9i",
        "coordinates": "",
        "label": "20 ng\u00f5 28 Nguy\u1ec5n Kh\u1ea3 Tr\u1ea1c, C\u1ea7u Gi\u1ea5y, H\u00e0 N\u1ed9i"
    }, {
        "id": "15",
        "name": "MOTOGO g\u1ea7n s\u00e2n bay N\u1ed9i B\u00e0i - HN",
        "coordinates": "",
        "label": "\u0110i\u1ec1n X\u00e1, Quang Ti\u1ebfn, S\u00f3c S\u01a1n, HN"
    }, {
        "id": "9",
        "name": "\u0110\u1ecba ch\u1ec9 c\u1ee7a b\u1ea1n t\u1ea1i H\u00e0 N\u1ed9i",
        "coordinates": "",
        "label": "\u0110\u1ecba ch\u1ec9 c\u1ee7a kh\u00e1ch t\u1ea1i H\u00e0 N\u1ed9i"
    }]
}, {
    "id": "3",
    "name": "Ninh B\u00ecnh",
    "iframePageURL": "",
    "locations": []
}, {
    "id": "5",
    "name": "H\u00e0 Giang",
    "iframePageURL": "",
    "locations": []
}, {
    "id": "6",
    "name": "Ha Giang",
    "iframePageURL": "",
    "locations": [{
        "id": "12",
        "name": "tho\u0302n L\u00e2m \u0110\u1ed3ng, Xa\u0303 Phu\u031bo\u031bng Thie\u0323\u0302n, Ha\u0300 Giang",
        "coordinates": "",
        "label": "tho\u0302n L\u00e2m \u0110\u1ed3ng, Xa\u0303 Phu\u031bo\u031bng Thie\u0323\u0302n, Ha\u0300 Giang"
    }, {
        "id": "11",
        "name": "\u0110\u1ecba \u0111i\u1ec3m c\u1ee7a b\u1ea1n t\u1ea1i H\u00e0 Giang",
        "coordinates": "",
        "label": "\u0110\u1ecba \u0111i\u1ec3m c\u1ee7a b\u1ea1n t\u1ea1i H\u00e0 Giang"
    }]
}];
var hqRentalsLocations = [{
    "id": "11",
    "name": "\u0110\u1ecba \u0111i\u1ec3m c\u1ee7a b\u1ea1n t\u1ea1i H\u00e0 Giang",
    "coordinates": "",
    "brand_id": "6",
    "address": "",
    "office_hours": "",
    "phone": ""
}, {
    "id": "9",
    "name": "\u0110\u1ecba ch\u1ec9 c\u1ee7a kh\u00e1ch t\u1ea1i H\u00e0 N\u1ed9i",
    "coordinates": "",
    "brand_id": "2",
    "address": "",
    "office_hours": "",
    "phone": ""
}, {
    "id": "12",
    "name": "tho\u0302n L\u00e2m \u0110\u1ed3ng, Xa\u0303 Phu\u031bo\u031bng Thie\u0323\u0302n, Ha\u0300 Giang",
    "coordinates": "",
    "brand_id": "6",
    "address": "tho\u0302n L\u00e2m \u0110\u1ed3ng, Xa\u0303 Phu\u031bo\u031bng Thie\u0323\u0302n, Ha\u0300 Giang",
    "office_hours": "",
    "phone": ""
}, {
    "id": "15",
    "name": "\u0110i\u1ec1n X\u00e1, Quang Ti\u1ebfn, S\u00f3c S\u01a1n, HN",
    "coordinates": "",
    "brand_id": "2",
    "address": "6 ng\u00f5 2 \u0110i\u1ec1n X\u00e1, Quang Ti\u1ebfn, S\u00f3c S\u01a1n, H\u00e0 N\u1ed9i, Vietnam, 50000, Vietnam",
    "office_hours": "",
    "phone": ""
}, {
    "id": "4",
    "name": "20 ng\u00f5 28 Nguy\u1ec5n Kh\u1ea3 Tr\u1ea1c, C\u1ea7u Gi\u1ea5y, H\u00e0 N\u1ed9i",
    "coordinates": "",
    "brand_id": "2",
    "address": "81 Nguy\u1ec5n Kh\u1ea3 Tr\u1ea1c, Mai D\u1ecbch, C\u1ea7u Gi\u1ea5y, H\u00e0 N\u1ed9i",
    "office_hours": "",
    "phone": ""
}, {
    "id": "3",
    "name": "1081 H\u1ed3ng H\u00e0, Ho\u00e0n Ki\u1ebfm, H\u00e0 N\u1ed9i",
    "coordinates": "",
    "brand_id": "2",
    "address": "1081 H\u1ed3ng H\u00e0, Ho\u00e0n Ki\u1ebfm, H\u00e0 N\u1ed9i",
    "office_hours": "",
    "phone": ""
}];
var hqRentalsVehicles = [{
    "id": "22",
    "name": "Honda WinnerX 150cc",
    "permalink": "https:\/\/motogo.vn\/vehicle-classes\/honda-winnerx-150cc\/"
}, {
    "id": "16",
    "name": "Honda Vision 110cc",
    "permalink": "https:\/\/motogo.vn\/vehicle-classes\/honda-vision-110cc\/"
}, {
    "id": "10",
    "name": "Honda XR 150cc",
    "permalink": "https:\/\/motogo.vn\/vehicle-classes\/honda-xr-150cc\/"
}, {
    "id": "9",
    "name": "Yamaha Sirius 110cc",
    "permalink": "https:\/\/motogo.vn\/vehicle-classes\/yamaha-sirius-110cc-2\/"
}, {
    "id": "5",
    "name": "Yamaha Sirius 110cc",
    "permalink": "https:\/\/motogo.vn\/vehicle-classes\/yamaha-sirius-110cc\/"
}, {
    "id": "2",
    "name": "Honda Air Blade 125cc",
    "permalink": "https:\/\/motogo.vn\/vehicle-classes\/honda-air-blade-125cc\/"
}];
var hqCarRentalSettingReturnLocationSameAsPickup = {
    "id": "1145",
    "module": "car_rental",
    "preference": "copy_pick_up_location_to_return_location_only_form",
    "setting": "1"
};
var hqCarRentalSettingDefaultPickupTime = {
    "id": "52",
    "module": "car_rental",
    "preference": "default_pick_up_time",
    "setting": "8:00 AM"
};
var hqCarRentalSettingDefaultReturnTime = {
    "id": "53",
    "module": "car_rental",
    "preference": "default_return_time",
    "setting": "8:00 AM"
};
var hqCarRentalSettingSetDefaultPickupTimeToCurrentTime = {
    "id": "1194",
    "module": "car_rental",
    "preference": "set_default_pick_up_time_as_current_time",
    "setting": "0"
};
var hqCarRentalSettingSetDefaultReturnTimeToCurrentTime = {
    "id": "1195",
    "module": "car_rental",
    "preference": "set_default_return_time_as_current_time",
    "setting": "0"
};
var hqRentalsAriesTypes = [];
var flatpickrDateTimeFormat = "d/m/Y h:i K"
var hqRentalsFrontEndDateformat = "d/m/Y G:i"
var hqRentalsSystemDateformat = "d/m/Y g:iA"
var hqRentalsTenantDatetimeFormat = "d/m/Y g:i A"
var hqMomentDateFormat = "DD/MM/YYYY h:mm A"
var hqSite = "https://motogo.vn/"
var hqSpinner = "https://motogo.vn/wp-content/plugins/hq-rental-software/includes/assets/img/screen-spinner.gif"
var hqLocale = "vi";
var dummy = 'really';
jQuery(document).ready(function() {
    var lang = getCookie('googtrans');
    if (lang) {
        jQuery('.hq-list-image-wrapper a').on('click', function(e) {
            e.preventDefault()
        });
        jQuery('.hq-grid-button-wrapper-left h3').each(function(index) {
            jQuery(this).html('From ' + jQuery(this).html())
        })
    }
});
function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1])
        }
    }
    return null
}
;"use strict";
(function(fn) {
    if (document.readyState != "loading") {
        return fn()
    }
    document.addEventListener("DOMContentLoaded", fn)
}
)(function kkStarRatings() {
    var isBusy = !1;
    function post(data, successCallback, errorCallback) {
        if (isBusy) {
            return
        }
        isBusy = !0;
        data = Object.assign({
            nonce: kk_star_ratings.nonce,
            action: kk_star_ratings.action,
        }, data);
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        }
        var request = new XMLHttpRequest();
        request.open("POST", kk_star_ratings.endpoint, !0);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                successCallback(request.responseText, request)
            } else {
                errorCallback(request.responseText, request)
            }
        }
        ;
        request.onloadend = function() {
            isBusy = !1
        }
        ;
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        request.send(query.join("&"))
    }
    function htmlToEl(html) {
        var div = document.createElement("div");
        div.innerHTML = html.trim();
        return div.firstChild
    }
    function apply($el) {
        function vote($star) {
            var data = {
                rating: $star.getAttribute("data-star"),
            };
            var payload = JSON.parse($el.getAttribute("data-payload"));
            for (var key in payload) {
                data["payload[" + key + "]"] = payload[key]
            }
            post(data, function(html) {
                var $newEl = htmlToEl(html);
                $el.parentNode.replaceChild($newEl, $el);
                unmount();
                $el = null;
                apply($newEl)
            }, console.error)
        }
        function onClick(e) {
            e.preventDefault();
            vote(e.currentTarget)
        }
        var $stars = $el.querySelectorAll("[data-star]");
        function unmount() {
            Array.prototype.forEach.call($stars, function($star) {
                $star.removeEventListener("click", onClick)
            })
        }
        function mount() {
            Array.prototype.forEach.call($stars, function($star) {
                $star.addEventListener("click", onClick)
            })
        }
        mount()
    }
    Array.prototype.forEach.call(document.querySelectorAll(".kk-star-ratings"), apply)
});
var DateFormatter;
!function() {
    "use strict";
    var D, s, r, a, n;
    D = function(e, t) {
        return "string" == typeof e && "string" == typeof t && e.toLowerCase() === t.toLowerCase()
    }
    ,
    s = function(e, t, a) {
        var n = a || "0"
          , r = e.toString();
        return r.length < t ? s(n + r, t) : r
    }
    ,
    r = function(e) {
        var t, a;
        for (e = e || {},
        t = 1; t < arguments.length; t++)
            if (a = arguments[t])
                for (var n in a)
                    a.hasOwnProperty(n) && ("object" == typeof a[n] ? r(e[n], a[n]) : e[n] = a[n]);
        return e
    }
    ,
    a = function(e, t) {
        for (var a = 0; a < t.length; a++)
            if (t[a].toLowerCase() === e.toLowerCase())
                return a;
        return -1
    }
    ,
    n = {
        dateSettings: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridiem: ["AM", "PM"],
            ordinal: function(e) {
                var t = e % 10
                  , a = {
                    1: "st",
                    2: "nd",
                    3: "rd"
                };
                return 1 !== Math.floor(e % 100 / 10) && a[t] ? a[t] : "th"
            }
        },
        separators: /[ \-+\/\.T:@]/g,
        validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
        intParts: /[djwNzmnyYhHgGis]/g,
        tzParts: /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        tzClip: /[^-+\dA-Z]/g
    },
    (DateFormatter = function(e) {
        var t = this
          , a = r(n, e);
        t.dateSettings = a.dateSettings,
        t.separators = a.separators,
        t.validParts = a.validParts,
        t.intParts = a.intParts,
        t.tzParts = a.tzParts,
        t.tzClip = a.tzClip
    }
    ).prototype = {
        constructor: DateFormatter,
        getMonth: function(e) {
            var t;
            return 0 === (t = a(e, this.dateSettings.monthsShort) + 1) && (t = a(e, this.dateSettings.months) + 1),
            t
        },
        parseDate: function(e, t) {
            var a, n, r, o, i, s, d, u, l, f, c = this, m = !1, h = !1, g = c.dateSettings, p = {
                date: null,
                year: null,
                month: null,
                day: null,
                hour: 0,
                min: 0,
                sec: 0
            };
            if (!e)
                return null;
            if (e instanceof Date)
                return e;
            if ("U" === t)
                return (r = parseInt(e)) ? new Date(1e3 * r) : e;
            switch (typeof e) {
            case "number":
                return new Date(e);
            case "string":
                break;
            default:
                return null
            }
            if (!(a = t.match(c.validParts)) || 0 === a.length)
                throw new Error("Invalid date format definition.");
            for (n = e.replace(c.separators, "\0").split("\0"),
            r = 0; r < n.length; r++)
                switch (o = n[r],
                i = parseInt(o),
                a[r]) {
                case "y":
                case "Y":
                    if (!i)
                        return null;
                    l = o.length,
                    p.year = 2 === l ? parseInt((i < 70 ? "20" : "19") + o) : i,
                    m = !0;
                    break;
                case "m":
                case "n":
                case "M":
                case "F":
                    if (isNaN(i)) {
                        if (!(0 < (s = c.getMonth(o))))
                            return null;
                        p.month = s
                    } else {
                        if (!(1 <= i && i <= 12))
                            return null;
                        p.month = i
                    }
                    m = !0;
                    break;
                case "d":
                case "j":
                    if (!(1 <= i && i <= 31))
                        return null;
                    p.day = i,
                    m = !0;
                    break;
                case "g":
                case "h":
                    if (f = n[d = -1 < a.indexOf("a") ? a.indexOf("a") : -1 < a.indexOf("A") ? a.indexOf("A") : -1],
                    -1 < d)
                        u = D(f, g.meridiem[0]) ? 0 : D(f, g.meridiem[1]) ? 12 : -1,
                        1 <= i && i <= 12 && -1 < u ? p.hour = i + u - 1 : 0 <= i && i <= 23 && (p.hour = i);
                    else {
                        if (!(0 <= i && i <= 23))
                            return null;
                        p.hour = i
                    }
                    h = !0;
                    break;
                case "G":
                case "H":
                    if (!(0 <= i && i <= 23))
                        return null;
                    p.hour = i,
                    h = !0;
                    break;
                case "i":
                    if (!(0 <= i && i <= 59))
                        return null;
                    p.min = i,
                    h = !0;
                    break;
                case "s":
                    if (!(0 <= i && i <= 59))
                        return null;
                    p.sec = i,
                    h = !0
                }
            if (!0 === m && p.year && p.month && p.day)
                p.date = new Date(p.year,p.month - 1,p.day,p.hour,p.min,p.sec,0);
            else {
                if (!0 !== h)
                    return null;
                p.date = new Date(0,0,0,p.hour,p.min,p.sec,0)
            }
            return p.date
        },
        guessDate: function(e, t) {
            if ("string" != typeof e)
                return e;
            var a, n, r, o, i, s, d = e.replace(this.separators, "\0").split("\0"), u = t.match(this.validParts), l = new Date, f = 0;
            if (!/^[djmn]/g.test(u[0]))
                return e;
            for (r = 0; r < d.length; r++) {
                if (f = 2,
                i = d[r],
                s = parseInt(i.substr(0, 2)),
                isNaN(s))
                    return null;
                switch (r) {
                case 0:
                    "m" === u[0] || "n" === u[0] ? l.setMonth(s - 1) : l.setDate(s);
                    break;
                case 1:
                    "m" === u[0] || "n" === u[0] ? l.setDate(s) : l.setMonth(s - 1);
                    break;
                case 2:
                    if (n = l.getFullYear(),
                    f = (a = i.length) < 4 ? a : 4,
                    !(n = parseInt(a < 4 ? n.toString().substr(0, 4 - a) + i : i.substr(0, 4))))
                        return null;
                    l.setFullYear(n);
                    break;
                case 3:
                    l.setHours(s);
                    break;
                case 4:
                    l.setMinutes(s);
                    break;
                case 5:
                    l.setSeconds(s)
                }
                0 < (o = i.substr(f)).length && d.splice(r + 1, 0, o)
            }
            return l
        },
        parseFormat: function(e, n) {
            var a, t = this, r = t.dateSettings, o = /\\?(.?)/gi, i = function(e, t) {
                return a[e] ? a[e]() : t
            };
            return a = {
                d: function() {
                    return s(a.j(), 2)
                },
                D: function() {
                    return r.daysShort[a.w()]
                },
                j: function() {
                    return n.getDate()
                },
                l: function() {
                    return r.days[a.w()]
                },
                N: function() {
                    return a.w() || 7
                },
                w: function() {
                    return n.getDay()
                },
                z: function() {
                    var e = new Date(a.Y(),a.n() - 1,a.j())
                      , t = new Date(a.Y(),0,1);
                    return Math.round((e - t) / 864e5)
                },
                W: function() {
                    var e = new Date(a.Y(),a.n() - 1,a.j() - a.N() + 3)
                      , t = new Date(e.getFullYear(),0,4);
                    return s(1 + Math.round((e - t) / 864e5 / 7), 2)
                },
                F: function() {
                    return r.months[n.getMonth()]
                },
                m: function() {
                    return s(a.n(), 2)
                },
                M: function() {
                    return r.monthsShort[n.getMonth()]
                },
                n: function() {
                    return n.getMonth() + 1
                },
                t: function() {
                    return new Date(a.Y(),a.n(),0).getDate()
                },
                L: function() {
                    var e = a.Y();
                    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? 1 : 0
                },
                o: function() {
                    var e = a.n()
                      , t = a.W();
                    return a.Y() + (12 === e && t < 9 ? 1 : 1 === e && 9 < t ? -1 : 0)
                },
                Y: function() {
                    return n.getFullYear()
                },
                y: function() {
                    return a.Y().toString().slice(-2)
                },
                a: function() {
                    return a.A().toLowerCase()
                },
                A: function() {
                    var e = a.G() < 12 ? 0 : 1;
                    return r.meridiem[e]
                },
                B: function() {
                    var e = 3600 * n.getUTCHours()
                      , t = 60 * n.getUTCMinutes()
                      , a = n.getUTCSeconds();
                    return s(Math.floor((e + t + a + 3600) / 86.4) % 1e3, 3)
                },
                g: function() {
                    return a.G() % 12 || 12
                },
                G: function() {
                    return n.getHours()
                },
                h: function() {
                    return s(a.g(), 2)
                },
                H: function() {
                    return s(a.G(), 2)
                },
                i: function() {
                    return s(n.getMinutes(), 2)
                },
                s: function() {
                    return s(n.getSeconds(), 2)
                },
                u: function() {
                    return s(1e3 * n.getMilliseconds(), 6)
                },
                e: function() {
                    return /\((.*)\)/.exec(String(n))[1] || "Coordinated Universal Time"
                },
                I: function() {
                    return new Date(a.Y(),0) - Date.UTC(a.Y(), 0) != new Date(a.Y(),6) - Date.UTC(a.Y(), 6) ? 1 : 0
                },
                O: function() {
                    var e = n.getTimezoneOffset()
                      , t = Math.abs(e);
                    return (0 < e ? "-" : "+") + s(100 * Math.floor(t / 60) + t % 60, 4)
                },
                P: function() {
                    var e = a.O();
                    return e.substr(0, 3) + ":" + e.substr(3, 2)
                },
                T: function() {
                    return (String(n).match(t.tzParts) || [""]).pop().replace(t.tzClip, "") || "UTC"
                },
                Z: function() {
                    return 60 * -n.getTimezoneOffset()
                },
                c: function() {
                    return "Y-m-d\\TH:i:sP".replace(o, i)
                },
                r: function() {
                    return "D, d M Y H:i:s O".replace(o, i)
                },
                U: function() {
                    return n.getTime() / 1e3 || 0
                }
            },
            i(e, e)
        },
        formatDate: function(e, t) {
            var a, n, r, o, i, s = "";
            if ("string" == typeof e && !(e = this.parseDate(e, t)))
                return null;
            if (e instanceof Date) {
                for (r = t.length,
                a = 0; a < r; a++)
                    "S" !== (i = t.charAt(a)) && "\\" !== i && (0 < a && "\\" === t.charAt(a - 1) ? s += i : (o = this.parseFormat(i, e),
                    a !== r - 1 && this.intParts.test(i) && "S" === t.charAt(a + 1) && (n = parseInt(o) || 0,
                    o += this.dateSettings.ordinal(n)),
                    s += o));
                return s
            }
            return ""
        }
    }
}();
var datetimepickerFactory = function(L) {
    "use strict";
    var s = {
        i18n: {
            ar: {
                months: ["كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"],
                dayOfWeekShort: ["ن", "ث", "ع", "خ", "ج", "س", "ح"],
                dayOfWeek: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
            },
            ro: {
                months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
                dayOfWeekShort: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
                dayOfWeek: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"]
            },
            id: {
                months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
                dayOfWeekShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
                dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
            },
            is: {
                months: ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"],
                dayOfWeekShort: ["Sun", "Mán", "Þrið", "Mið", "Fim", "Fös", "Lau"],
                dayOfWeek: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"]
            },
            bg: {
                months: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
                dayOfWeekShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                dayOfWeek: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"]
            },
            fa: {
                months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
                dayOfWeekShort: ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],
                dayOfWeek: ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه"]
            },
            ru: {
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                dayOfWeekShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                dayOfWeek: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
            },
            uk: {
                months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
                dayOfWeekShort: ["Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"],
                dayOfWeek: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
            },
            en: {
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                dayOfWeekShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            },
            el: {
                months: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
                dayOfWeekShort: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"],
                dayOfWeek: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
            },
            de: {
                months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                dayOfWeekShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                dayOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
            },
            nl: {
                months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
                dayOfWeekShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
                dayOfWeek: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
            },
            tr: {
                months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
                dayOfWeekShort: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"],
                dayOfWeek: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
            },
            fr: {
                months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                dayOfWeekShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                dayOfWeek: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
            },
            es: {
                months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                dayOfWeekShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
                dayOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
            },
            th: {
                months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
                dayOfWeekShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
                dayOfWeek: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
            },
            pl: {
                months: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"],
                dayOfWeekShort: ["nd", "pn", "wt", "śr", "cz", "pt", "sb"],
                dayOfWeek: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
            },
            pt: {
                months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                dayOfWeekShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
            },
            ch: {
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"]
            },
            se: {
                months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
                dayOfWeekShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"]
            },
            km: {
                months: ["មករា​", "កុម្ភៈ", "មិនា​", "មេសា​", "ឧសភា​", "មិថុនា​", "កក្កដា​", "សីហា​", "កញ្ញា​", "តុលា​", "វិច្ឆិកា", "ធ្នូ​"],
                dayOfWeekShort: ["អាទិ​", "ច័ន្ទ​", "អង្គារ​", "ពុធ​", "ព្រហ​​", "សុក្រ​", "សៅរ៍"],
                dayOfWeek: ["អាទិត្យ​", "ច័ន្ទ​", "អង្គារ​", "ពុធ​", "ព្រហស្បតិ៍​", "សុក្រ​", "សៅរ៍"]
            },
            kr: {
                months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
                dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
            },
            it: {
                months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
                dayOfWeekShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
                dayOfWeek: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
            },
            da: {
                months: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
                dayOfWeekShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
                dayOfWeek: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
            },
            no: {
                months: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
                dayOfWeekShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
                dayOfWeek: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"]
            },
            ja: {
                months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                dayOfWeekShort: ["日", "月", "火", "水", "木", "金", "土"],
                dayOfWeek: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"]
            },
            vi: {
                months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
                dayOfWeekShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
            },
            sl: {
                months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
                dayOfWeekShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
                dayOfWeek: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"]
            },
            cs: {
                months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
                dayOfWeekShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"]
            },
            hu: {
                months: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
                dayOfWeekShort: ["Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"],
                dayOfWeek: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
            },
            az: {
                months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
                dayOfWeekShort: ["B", "Be", "Ça", "Ç", "Ca", "C", "Ş"],
                dayOfWeek: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"]
            },
            bs: {
                months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
                dayOfWeekShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
                dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
            },
            ca: {
                months: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
                dayOfWeekShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
                dayOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]
            },
            "en-GB": {
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                dayOfWeekShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            },
            et: {
                months: ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"],
                dayOfWeekShort: ["P", "E", "T", "K", "N", "R", "L"],
                dayOfWeek: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"]
            },
            eu: {
                months: ["Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"],
                dayOfWeekShort: ["Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."],
                dayOfWeek: ["Igandea", "Astelehena", "Asteartea", "Asteazkena", "Osteguna", "Ostirala", "Larunbata"]
            },
            fi: {
                months: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
                dayOfWeekShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
                dayOfWeek: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
            },
            gl: {
                months: ["Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"],
                dayOfWeekShort: ["Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"],
                dayOfWeek: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"]
            },
            hr: {
                months: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
                dayOfWeekShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
                dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
            },
            ko: {
                months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
                dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
            },
            lt: {
                months: ["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"],
                dayOfWeekShort: ["Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"],
                dayOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"]
            },
            lv: {
                months: ["Janvāris", "Februāris", "Marts", "Aprīlis ", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
                dayOfWeekShort: ["Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"],
                dayOfWeek: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"]
            },
            mk: {
                months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"],
                dayOfWeekShort: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
                dayOfWeek: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"]
            },
            mn: {
                months: ["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"],
                dayOfWeekShort: ["Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"],
                dayOfWeek: ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"]
            },
            "pt-BR": {
                months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                dayOfWeekShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
            },
            sk: {
                months: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
                dayOfWeekShort: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],
                dayOfWeek: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
            },
            sq: {
                months: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"],
                dayOfWeekShort: ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"],
                dayOfWeek: ["E Diel", "E Hënë", "E Martē", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"]
            },
            "sr-YU": {
                months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
                dayOfWeekShort: ["Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"],
                dayOfWeek: ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"]
            },
            sr: {
                months: ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"],
                dayOfWeekShort: ["нед", "пон", "уто", "сре", "чет", "пет", "суб"],
                dayOfWeek: ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"]
            },
            sv: {
                months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
                dayOfWeekShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
                dayOfWeek: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
            },
            "zh-TW": {
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
            },
            zh: {
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
            },
            ug: {
                months: ["1-ئاي", "2-ئاي", "3-ئاي", "4-ئاي", "5-ئاي", "6-ئاي", "7-ئاي", "8-ئاي", "9-ئاي", "10-ئاي", "11-ئاي", "12-ئاي"],
                dayOfWeek: ["يەكشەنبە", "دۈشەنبە", "سەيشەنبە", "چارشەنبە", "پەيشەنبە", "جۈمە", "شەنبە"]
            },
            he: {
                months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
                dayOfWeekShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
                dayOfWeek: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"]
            },
            hy: {
                months: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
                dayOfWeekShort: ["Կի", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ"],
                dayOfWeek: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"]
            },
            kg: {
                months: ["Үчтүн айы", "Бирдин айы", "Жалган Куран", "Чын Куран", "Бугу", "Кулжа", "Теке", "Баш Оона", "Аяк Оона", "Тогуздун айы", "Жетинин айы", "Бештин айы"],
                dayOfWeekShort: ["Жек", "Дүй", "Шей", "Шар", "Бей", "Жум", "Ише"],
                dayOfWeek: ["Жекшемб", "Дүйшөмб", "Шейшемб", "Шаршемб", "Бейшемби", "Жума", "Ишенб"]
            },
            rm: {
                months: ["Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"],
                dayOfWeekShort: ["Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"],
                dayOfWeek: ["Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"]
            },
            ka: {
                months: ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"],
                dayOfWeekShort: ["კვ", "ორშ", "სამშ", "ოთხ", "ხუთ", "პარ", "შაბ"],
                dayOfWeek: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]
            }
        },
        ownerDocument: document,
        contentWindow: window,
        value: "",
        rtl: !1,
        format: "Y/m/d H:i",
        formatTime: "H:i",
        formatDate: "Y/m/d",
        startDate: !1,
        step: 60,
        monthChangeSpinner: !0,
        closeOnDateSelect: !1,
        closeOnTimeSelect: !0,
        closeOnWithoutClick: !0,
        closeOnInputClick: !0,
        openOnFocus: !0,
        timepicker: !0,
        datepicker: !0,
        weeks: !1,
        defaultTime: !1,
        defaultDate: !1,
        minDate: !1,
        maxDate: !1,
        minTime: !1,
        maxTime: !1,
        minDateTime: !1,
        maxDateTime: !1,
        allowTimes: [],
        opened: !1,
        initTime: !0,
        inline: !1,
        theme: "",
        touchMovedThreshold: 5,
        onSelectDate: function() {},
        onSelectTime: function() {},
        onChangeMonth: function() {},
        onGetWeekOfYear: function() {},
        onChangeYear: function() {},
        onChangeDateTime: function() {},
        onShow: function() {},
        onClose: function() {},
        onGenerate: function() {},
        withoutCopyright: !0,
        inverseButton: !1,
        hours12: !1,
        next: "xdsoft_next",
        prev: "xdsoft_prev",
        dayOfWeekStart: 0,
        parentID: "body",
        timeHeightInTimePicker: 25,
        timepickerScrollbar: !0,
        todayButton: !0,
        prevButton: !0,
        nextButton: !0,
        defaultSelect: !0,
        scrollMonth: !0,
        scrollTime: !0,
        scrollInput: !0,
        lazyInit: !1,
        mask: !1,
        validateOnBlur: !0,
        allowBlank: !0,
        yearStart: 1950,
        yearEnd: 2050,
        monthStart: 0,
        monthEnd: 11,
        style: "",
        id: "",
        fixed: !1,
        roundTime: "round",
        className: "",
        weekends: [],
        highlightedDates: [],
        highlightedPeriods: [],
        allowDates: [],
        allowDateRe: null,
        disabledDates: [],
        disabledWeekDays: [],
        yearOffset: 0,
        beforeShowDay: null,
        enterLikeTab: !0,
        showApplyButton: !1,
        insideParent: !1
    }
      , E = null
      , n = null
      , R = "en"
      , a = {
        meridiem: ["AM", "PM"]
    }
      , r = function() {
        var e = s.i18n[R]
          , t = {
            days: e.dayOfWeek,
            daysShort: e.dayOfWeekShort,
            months: e.months,
            monthsShort: L.map(e.months, function(e) {
                return e.substring(0, 3)
            })
        };
        "function" == typeof DateFormatter && (E = n = new DateFormatter({
            dateSettings: L.extend({}, a, t)
        }))
    }
      , o = {
        moment: {
            default_options: {
                format: "YYYY/MM/DD HH:mm",
                formatDate: "YYYY/MM/DD",
                formatTime: "HH:mm"
            },
            formatter: {
                parseDate: function(e, t) {
                    if (i(t))
                        return n.parseDate(e, t);
                    var a = moment(e, t);
                    return !!a.isValid() && a.toDate()
                },
                formatDate: function(e, t) {
                    return i(t) ? n.formatDate(e, t) : moment(e).format(t)
                },
                formatMask: function(e) {
                    return e.replace(/Y{4}/g, "9999").replace(/Y{2}/g, "99").replace(/M{2}/g, "19").replace(/D{2}/g, "39").replace(/H{2}/g, "29").replace(/m{2}/g, "59").replace(/s{2}/g, "59")
                }
            }
        }
    };
    L.datetimepicker = {
        setLocale: function(e) {
            var t = s.i18n[e] ? e : "en";
            R !== t && (R = t,
            r())
        },
        setDateFormatter: function(e) {
            if ("string" == typeof e && o.hasOwnProperty(e)) {
                var t = o[e];
                L.extend(s, t.default_options),
                E = t.formatter
            } else
                E = e
        }
    };
    var t = {
        RFC_2822: "D, d M Y H:i:s O",
        ATOM: "Y-m-dTH:i:sP",
        ISO_8601: "Y-m-dTH:i:sO",
        RFC_822: "D, d M y H:i:s O",
        RFC_850: "l, d-M-y H:i:s T",
        RFC_1036: "D, d M y H:i:s O",
        RFC_1123: "D, d M Y H:i:s O",
        RSS: "D, d M Y H:i:s O",
        W3C: "Y-m-dTH:i:sP"
    }
      , i = function(e) {
        return -1 !== Object.values(t).indexOf(e)
    };
    function m(e, t, a) {
        this.date = e,
        this.desc = t,
        this.style = a
    }
    L.extend(L.datetimepicker, t),
    r(),
    window.getComputedStyle || (window.getComputedStyle = function(a) {
        return this.el = a,
        this.getPropertyValue = function(e) {
            var t = /(-([a-z]))/g;
            return "float" === e && (e = "styleFloat"),
            t.test(e) && (e = e.replace(t, function(e, t, a) {
                return a.toUpperCase()
            })),
            a.currentStyle[e] || null
        }
        ,
        this
    }
    ),
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        var a, n;
        for (a = t || 0,
        n = this.length; a < n; a += 1)
            if (this[a] === e)
                return a;
        return -1
    }
    ),
    Date.prototype.countDaysInMonth = function() {
        return new Date(this.getFullYear(),this.getMonth() + 1,0).getDate()
    }
    ,
    L.fn.xdsoftScroller = function(p, D) {
        return this.each(function() {
            var o, i, s, d, u, l = L(this), a = function(e) {
                var t, a = {
                    x: 0,
                    y: 0
                };
                return "touchstart" === e.type || "touchmove" === e.type || "touchend" === e.type || "touchcancel" === e.type ? (t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                a.x = t.clientX,
                a.y = t.clientY) : "mousedown" !== e.type && "mouseup" !== e.type && "mousemove" !== e.type && "mouseover" !== e.type && "mouseout" !== e.type && "mouseenter" !== e.type && "mouseleave" !== e.type || (a.x = e.clientX,
                a.y = e.clientY),
                a
            }, f = 100, n = !1, r = 0, c = 0, m = 0, t = !1, h = 0, g = function() {};
            "hide" !== D ? (L(this).hasClass("xdsoft_scroller_box") || (o = l.children().eq(0),
            i = l[0].clientHeight,
            s = o[0].offsetHeight,
            d = L('<div class="xdsoft_scrollbar"></div>'),
            u = L('<div class="xdsoft_scroller"></div>'),
            d.append(u),
            l.addClass("xdsoft_scroller_box").append(d),
            g = function(e) {
                var t = a(e).y - r + h;
                t < 0 && (t = 0),
                t + u[0].offsetHeight > m && (t = m - u[0].offsetHeight),
                l.trigger("scroll_element.xdsoft_scroller", [f ? t / f : 0])
            }
            ,
            u.on("touchstart.xdsoft_scroller mousedown.xdsoft_scroller", function(e) {
                i || l.trigger("resize_scroll.xdsoft_scroller", [D]),
                r = a(e).y,
                h = parseInt(u.css("margin-top"), 10),
                m = d[0].offsetHeight,
                "mousedown" === e.type || "touchstart" === e.type ? (p.ownerDocument && L(p.ownerDocument.body).addClass("xdsoft_noselect"),
                L([p.ownerDocument.body, p.contentWindow]).on("touchend mouseup.xdsoft_scroller", function e() {
                    L([p.ownerDocument.body, p.contentWindow]).off("touchend mouseup.xdsoft_scroller", e).off("mousemove.xdsoft_scroller", g).removeClass("xdsoft_noselect")
                }),
                L(p.ownerDocument.body).on("mousemove.xdsoft_scroller", g)) : (t = !0,
                e.stopPropagation(),
                e.preventDefault())
            }).on("touchmove", function(e) {
                t && (e.preventDefault(),
                g(e))
            }).on("touchend touchcancel", function() {
                t = !1,
                h = 0
            }),
            l.on("scroll_element.xdsoft_scroller", function(e, t) {
                i || l.trigger("resize_scroll.xdsoft_scroller", [t, !0]),
                t = 1 < t ? 1 : t < 0 || isNaN(t) ? 0 : t,
                u.css("margin-top", f * t),
                setTimeout(function() {
                    o.css("marginTop", -parseInt((o[0].offsetHeight - i) * t, 10))
                }, 10)
            }).on("resize_scroll.xdsoft_scroller", function(e, t, a) {
                var n, r;
                i = l[0].clientHeight,
                s = o[0].offsetHeight,
                r = (n = i / s) * d[0].offsetHeight,
                1 < n ? u.hide() : (u.show(),
                u.css("height", parseInt(10 < r ? r : 10, 10)),
                f = d[0].offsetHeight - u[0].offsetHeight,
                !0 !== a && l.trigger("scroll_element.xdsoft_scroller", [t || Math.abs(parseInt(o.css("marginTop"), 10)) / (s - i)]))
            }),
            l.on("mousewheel", function(e) {
                var t = Math.abs(parseInt(o.css("marginTop"), 10));
                return (t -= 20 * e.deltaY) < 0 && (t = 0),
                l.trigger("scroll_element.xdsoft_scroller", [t / (s - i)]),
                e.stopPropagation(),
                !1
            }),
            l.on("touchstart", function(e) {
                n = a(e),
                c = Math.abs(parseInt(o.css("marginTop"), 10))
            }),
            l.on("touchmove", function(e) {
                if (n) {
                    e.preventDefault();
                    var t = a(e);
                    l.trigger("scroll_element.xdsoft_scroller", [(c - (t.y - n.y)) / (s - i)])
                }
            }),
            l.on("touchend touchcancel", function() {
                n = !1,
                c = 0
            })),
            l.trigger("resize_scroll.xdsoft_scroller", [D])) : l.find(".xdsoft_scrollbar").hide()
        })
    }
    ,
    L.fn.datetimepicker = function(H, a) {
        var n, r, o = this, p = 17, D = 13, y = 27, v = 37, b = 38, k = 39, x = 40, T = 9, S = 116, M = 65, w = 67, j = 86, J = 90, z = 89, I = !1, N = L.isPlainObject(H) || !H ? L.extend(!0, {}, s, H) : L.extend(!0, {}, s), i = 0;
        return n = function(O) {
            var t, n, a, r, W, h, _ = L('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'), e = L('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'), g = L('<div class="xdsoft_datepicker active"></div>'), F = L('<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'), C = L('<div class="xdsoft_calendar"></div>'), o = L('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'), u = o.find(".xdsoft_time_box").eq(0), P = L('<div class="xdsoft_time_variant"></div>'), i = L('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'), Y = L('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'), A = L('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'), s = !1, d = 0;
            N.id && _.attr("id", N.id),
            N.style && _.attr("style", N.style),
            N.weeks && _.addClass("xdsoft_showweeks"),
            N.rtl && _.addClass("xdsoft_rtl"),
            _.addClass("xdsoft_" + N.theme),
            _.addClass(N.className),
            F.find(".xdsoft_month span").after(Y),
            F.find(".xdsoft_year span").after(A),
            F.find(".xdsoft_month,.xdsoft_year").on("touchstart mousedown.xdsoft", function(e) {
                var t, a, n = L(this).find(".xdsoft_select").eq(0), r = 0, o = 0, i = n.is(":visible");
                for (F.find(".xdsoft_select").hide(),
                W.currentTime && (r = W.currentTime[L(this).hasClass("xdsoft_month") ? "getMonth" : "getFullYear"]()),
                n[i ? "hide" : "show"](),
                t = n.find("div.xdsoft_option"),
                a = 0; a < t.length && t.eq(a).data("value") !== r; a += 1)
                    o += t[0].offsetHeight;
                return n.xdsoftScroller(N, o / (n.children()[0].offsetHeight - n[0].clientHeight)),
                e.stopPropagation(),
                !1
            });
            var l = function(e) {
                var t = e.originalEvent
                  , a = t.touches ? t.touches[0] : t;
                this.touchStartPosition = this.touchStartPosition || a;
                var n = Math.abs(this.touchStartPosition.clientX - a.clientX)
                  , r = Math.abs(this.touchStartPosition.clientY - a.clientY);
                Math.sqrt(n * n + r * r) > N.touchMovedThreshold && (this.touchMoved = !0)
            };
            function f() {
                var e, t = !1;
                return N.startDate ? t = W.strToDate(N.startDate) : (t = N.value || (O && O.val && O.val() ? O.val() : "")) ? (t = W.strToDateTime(t),
                N.yearOffset && (t = new Date(t.getFullYear() - N.yearOffset,t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()))) : N.defaultDate && (t = W.strToDateTime(N.defaultDate),
                N.defaultTime && (e = W.strtotime(N.defaultTime),
                t.setHours(e.getHours()),
                t.setMinutes(e.getMinutes()))),
                t && W.isValidDate(t) ? _.data("changed", !0) : t = "",
                t || 0
            }
            function c(m) {
                var h = function(e, t) {
                    var a = e.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, "\\$1").replace(/_/g, "{digit+}").replace(/([0-9]{1})/g, "{digit$1}").replace(/\{digit([0-9]{1})\}/g, "[0-$1_]{1}").replace(/\{digit[\+]\}/g, "[0-9_]{1}");
                    return new RegExp(a).test(t)
                }
                  , g = function(e, t) {
                    if (!(e = "string" == typeof e || e instanceof String ? m.ownerDocument.getElementById(e) : e))
                        return !1;
                    if (e.createTextRange) {
                        var a = e.createTextRange();
                        return a.collapse(!0),
                        a.moveEnd("character", t),
                        a.moveStart("character", t),
                        a.select(),
                        !0
                    }
                    return !!e.setSelectionRange && (e.setSelectionRange(t, t),
                    !0)
                };
                m.mask && O.off("keydown.xdsoft"),
                !0 === m.mask && (E.formatMask ? m.mask = E.formatMask(m.format) : m.mask = m.format.replace(/Y/g, "9999").replace(/F/g, "9999").replace(/m/g, "19").replace(/d/g, "39").replace(/H/g, "29").replace(/i/g, "59").replace(/s/g, "59")),
                "string" === L.type(m.mask) && (h(m.mask, O.val()) || (O.val(m.mask.replace(/[0-9]/g, "_")),
                g(O[0], 0)),
                O.on("paste.xdsoft", function(e) {
                    var t = (e.clipboardData || e.originalEvent.clipboardData || window.clipboardData).getData("text")
                      , a = this.value
                      , n = this.selectionStart;
                    return a = a.substr(0, n) + t + a.substr(n + t.length),
                    n += t.length,
                    h(m.mask, a) ? (this.value = a,
                    g(this, n)) : "" === L.trim(a) ? this.value = m.mask.replace(/[0-9]/g, "_") : O.trigger("error_input.xdsoft"),
                    e.preventDefault(),
                    !1
                }),
                O.on("keydown.xdsoft", function(e) {
                    var t, a = this.value, n = e.which, r = this.selectionStart, o = this.selectionEnd, i = r !== o;
                    if (48 <= n && n <= 57 || 96 <= n && n <= 105 || 8 === n || 46 === n) {
                        for (t = 8 === n || 46 === n ? "_" : String.fromCharCode(96 <= n && n <= 105 ? n - 48 : n),
                        8 === n && r && !i && (r -= 1); ; ) {
                            var s = m.mask.substr(r, 1)
                              , d = r < m.mask.length
                              , u = 0 < r;
                            if (!(/[^0-9_]/.test(s) && d && u))
                                break;
                            r += 8 !== n || i ? 1 : -1
                        }
                        if (e.metaKey && (i = !(r = 0)),
                        i) {
                            var l = o - r
                              , f = m.mask.replace(/[0-9]/g, "_")
                              , c = f.substr(r, l).substr(1);
                            a = a.substr(0, r) + (t + c) + a.substr(r + l)
                        } else {
                            a = a.substr(0, r) + t + a.substr(r + 1)
                        }
                        if ("" === L.trim(a))
                            a = f;
                        else if (r === m.mask.length)
                            return e.preventDefault(),
                            !1;
                        for (r += 8 === n ? 0 : 1; /[^0-9_]/.test(m.mask.substr(r, 1)) && r < m.mask.length && 0 < r; )
                            r += 8 === n ? 0 : 1;
                        h(m.mask, a) ? (this.value = a,
                        g(this, r)) : "" === L.trim(a) ? this.value = m.mask.replace(/[0-9]/g, "_") : O.trigger("error_input.xdsoft")
                    } else if (-1 !== [M, w, j, J, z].indexOf(n) && I || -1 !== [y, b, x, v, k, S, p, T, D].indexOf(n))
                        return !0;
                    return e.preventDefault(),
                    !1
                }))
            }
            F.find(".xdsoft_select").xdsoftScroller(N).on("touchstart mousedown.xdsoft", function(e) {
                var t = e.originalEvent;
                this.touchMoved = !1,
                this.touchStartPosition = t.touches ? t.touches[0] : t,
                e.stopPropagation(),
                e.preventDefault()
            }).on("touchmove", ".xdsoft_option", l).on("touchend mousedown.xdsoft", ".xdsoft_option", function() {
                if (!this.touchMoved) {
                    void 0 !== W.currentTime && null !== W.currentTime || (W.currentTime = W.now());
                    var e = W.currentTime.getFullYear();
                    W && W.currentTime && W.currentTime[L(this).parent().parent().hasClass("xdsoft_monthselect") ? "setMonth" : "setFullYear"](L(this).data("value")),
                    L(this).parent().parent().hide(),
                    _.trigger("xchange.xdsoft"),
                    N.onChangeMonth && L.isFunction(N.onChangeMonth) && N.onChangeMonth.call(_, W.currentTime, _.data("input")),
                    e !== W.currentTime.getFullYear() && L.isFunction(N.onChangeYear) && N.onChangeYear.call(_, W.currentTime, _.data("input"))
                }
            }),
            _.getValue = function() {
                return W.getCurrentTime()
            }
            ,
            _.setOptions = function(e) {
                var l = {};
                N = L.extend(!0, {}, N, e),
                e.allowTimes && L.isArray(e.allowTimes) && e.allowTimes.length && (N.allowTimes = L.extend(!0, [], e.allowTimes)),
                e.weekends && L.isArray(e.weekends) && e.weekends.length && (N.weekends = L.extend(!0, [], e.weekends)),
                e.allowDates && L.isArray(e.allowDates) && e.allowDates.length && (N.allowDates = L.extend(!0, [], e.allowDates)),
                e.allowDateRe && "[object String]" === Object.prototype.toString.call(e.allowDateRe) && (N.allowDateRe = new RegExp(e.allowDateRe)),
                e.highlightedDates && L.isArray(e.highlightedDates) && e.highlightedDates.length && (L.each(e.highlightedDates, function(e, t) {
                    var a, n = L.map(t.split(","), L.trim), r = new m(E.parseDate(n[0], N.formatDate),n[1],n[2]), o = E.formatDate(r.date, N.formatDate);
                    void 0 !== l[o] ? (a = l[o].desc) && a.length && r.desc && r.desc.length && (l[o].desc = a + "\n" + r.desc) : l[o] = r
                }),
                N.highlightedDates = L.extend(!0, [], l)),
                e.highlightedPeriods && L.isArray(e.highlightedPeriods) && e.highlightedPeriods.length && (l = L.extend(!0, [], N.highlightedDates),
                L.each(e.highlightedPeriods, function(e, t) {
                    var a, n, r, o, i, s, d;
                    if (L.isArray(t))
                        a = t[0],
                        n = t[1],
                        r = t[2],
                        d = t[3];
                    else {
                        var u = L.map(t.split(","), L.trim);
                        a = E.parseDate(u[0], N.formatDate),
                        n = E.parseDate(u[1], N.formatDate),
                        r = u[2],
                        d = u[3]
                    }
                    for (; a <= n; )
                        o = new m(a,r,d),
                        i = E.formatDate(a, N.formatDate),
                        a.setDate(a.getDate() + 1),
                        void 0 !== l[i] ? (s = l[i].desc) && s.length && o.desc && o.desc.length && (l[i].desc = s + "\n" + o.desc) : l[i] = o
                }),
                N.highlightedDates = L.extend(!0, [], l)),
                e.disabledDates && L.isArray(e.disabledDates) && e.disabledDates.length && (N.disabledDates = L.extend(!0, [], e.disabledDates)),
                e.disabledWeekDays && L.isArray(e.disabledWeekDays) && e.disabledWeekDays.length && (N.disabledWeekDays = L.extend(!0, [], e.disabledWeekDays)),
                !N.open && !N.opened || N.inline || O.trigger("open.xdsoft"),
                N.inline && (s = !0,
                _.addClass("xdsoft_inline"),
                O.after(_).hide()),
                N.inverseButton && (N.next = "xdsoft_prev",
                N.prev = "xdsoft_next"),
                N.datepicker ? g.addClass("active") : g.removeClass("active"),
                N.timepicker ? o.addClass("active") : o.removeClass("active"),
                N.value && (W.setCurrentTime(N.value),
                O && O.val && O.val(W.str)),
                isNaN(N.dayOfWeekStart) ? N.dayOfWeekStart = 0 : N.dayOfWeekStart = parseInt(N.dayOfWeekStart, 10) % 7,
                N.timepickerScrollbar || u.xdsoftScroller(N, "hide"),
                N.minDate && /^[\+\-](.*)$/.test(N.minDate) && (N.minDate = E.formatDate(W.strToDateTime(N.minDate), N.formatDate)),
                N.maxDate && /^[\+\-](.*)$/.test(N.maxDate) && (N.maxDate = E.formatDate(W.strToDateTime(N.maxDate), N.formatDate)),
                N.minDateTime && /^\+(.*)$/.test(N.minDateTime) && (N.minDateTime = W.strToDateTime(N.minDateTime).dateFormat(N.formatDate)),
                N.maxDateTime && /^\+(.*)$/.test(N.maxDateTime) && (N.maxDateTime = W.strToDateTime(N.maxDateTime).dateFormat(N.formatDate)),
                i.toggle(N.showApplyButton),
                F.find(".xdsoft_today_button").css("visibility", N.todayButton ? "visible" : "hidden"),
                F.find("." + N.prev).css("visibility", N.prevButton ? "visible" : "hidden"),
                F.find("." + N.next).css("visibility", N.nextButton ? "visible" : "hidden"),
                c(N),
                N.validateOnBlur && O.off("blur.xdsoft").on("blur.xdsoft", function() {
                    if (N.allowBlank && (!L.trim(L(this).val()).length || "string" == typeof N.mask && L.trim(L(this).val()) === N.mask.replace(/[0-9]/g, "_")))
                        L(this).val(null),
                        _.data("xdsoft_datetime").empty();
                    else {
                        var e = E.parseDate(L(this).val(), N.format);
                        if (e)
                            L(this).val(E.formatDate(e, N.format));
                        else {
                            var t = +[L(this).val()[0], L(this).val()[1]].join("")
                              , a = +[L(this).val()[2], L(this).val()[3]].join("");
                            !N.datepicker && N.timepicker && 0 <= t && t < 24 && 0 <= a && a < 60 ? L(this).val([t, a].map(function(e) {
                                return 9 < e ? e : "0" + e
                            }).join(":")) : L(this).val(E.formatDate(W.now(), N.format))
                        }
                        _.data("xdsoft_datetime").setCurrentTime(L(this).val())
                    }
                    _.trigger("changedatetime.xdsoft"),
                    _.trigger("close.xdsoft")
                }),
                N.dayOfWeekStartPrev = 0 === N.dayOfWeekStart ? 6 : N.dayOfWeekStart - 1,
                _.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft")
            }
            ,
            _.data("options", N).on("touchstart mousedown.xdsoft", function(e) {
                return e.stopPropagation(),
                e.preventDefault(),
                A.hide(),
                Y.hide(),
                !1
            }),
            u.append(P),
            u.xdsoftScroller(N),
            _.on("afterOpen.xdsoft", function() {
                u.xdsoftScroller(N)
            }),
            _.append(g).append(o),
            !0 !== N.withoutCopyright && _.append(e),
            g.append(F).append(C).append(i),
            N.insideParent ? L(O).parent().append(_) : L(N.parentID).append(_),
            W = new function() {
                var r = this;
                r.now = function(e) {
                    var t, a, n = new Date;
                    return !e && N.defaultDate && (t = r.strToDateTime(N.defaultDate),
                    n.setFullYear(t.getFullYear()),
                    n.setMonth(t.getMonth()),
                    n.setDate(t.getDate())),
                    n.setFullYear(n.getFullYear()),
                    !e && N.defaultTime && (a = r.strtotime(N.defaultTime),
                    n.setHours(a.getHours()),
                    n.setMinutes(a.getMinutes()),
                    n.setSeconds(a.getSeconds()),
                    n.setMilliseconds(a.getMilliseconds())),
                    n
                }
                ,
                r.isValidDate = function(e) {
                    return "[object Date]" === Object.prototype.toString.call(e) && !isNaN(e.getTime())
                }
                ,
                r.setCurrentTime = function(e, t) {
                    "string" == typeof e ? r.currentTime = r.strToDateTime(e) : r.isValidDate(e) ? r.currentTime = e : e || t || !N.allowBlank || N.inline ? r.currentTime = r.now() : r.currentTime = null,
                    _.trigger("xchange.xdsoft")
                }
                ,
                r.empty = function() {
                    r.currentTime = null
                }
                ,
                r.getCurrentTime = function() {
                    return r.currentTime
                }
                ,
                r.nextMonth = function() {
                    void 0 !== r.currentTime && null !== r.currentTime || (r.currentTime = r.now());
                    var e, t = r.currentTime.getMonth() + 1;
                    return 12 === t && (r.currentTime.setFullYear(r.currentTime.getFullYear() + 1),
                    t = 0),
                    e = r.currentTime.getFullYear(),
                    r.currentTime.setDate(Math.min(new Date(r.currentTime.getFullYear(),t + 1,0).getDate(), r.currentTime.getDate())),
                    r.currentTime.setMonth(t),
                    N.onChangeMonth && L.isFunction(N.onChangeMonth) && N.onChangeMonth.call(_, W.currentTime, _.data("input")),
                    e !== r.currentTime.getFullYear() && L.isFunction(N.onChangeYear) && N.onChangeYear.call(_, W.currentTime, _.data("input")),
                    _.trigger("xchange.xdsoft"),
                    t
                }
                ,
                r.prevMonth = function() {
                    void 0 !== r.currentTime && null !== r.currentTime || (r.currentTime = r.now());
                    var e = r.currentTime.getMonth() - 1;
                    return -1 === e && (r.currentTime.setFullYear(r.currentTime.getFullYear() - 1),
                    e = 11),
                    r.currentTime.setDate(Math.min(new Date(r.currentTime.getFullYear(),e + 1,0).getDate(), r.currentTime.getDate())),
                    r.currentTime.setMonth(e),
                    N.onChangeMonth && L.isFunction(N.onChangeMonth) && N.onChangeMonth.call(_, W.currentTime, _.data("input")),
                    _.trigger("xchange.xdsoft"),
                    e
                }
                ,
                r.getWeekOfYear = function(e) {
                    if (N.onGetWeekOfYear && L.isFunction(N.onGetWeekOfYear)) {
                        var t = N.onGetWeekOfYear.call(_, e);
                        if (void 0 !== t)
                            return t
                    }
                    var a = new Date(e.getFullYear(),0,1);
                    return 4 !== a.getDay() && a.setMonth(0, 1 + (4 - a.getDay() + 7) % 7),
                    Math.ceil(((e - a) / 864e5 + a.getDay() + 1) / 7)
                }
                ,
                r.strToDateTime = function(e) {
                    var t, a, n = [];
                    return e && e instanceof Date && r.isValidDate(e) ? e : ((n = /^([+-]{1})(.*)$/.exec(e)) && (n[2] = E.parseDate(n[2], N.formatDate)),
                    a = n && n[2] ? (t = n[2].getTime() - 6e4 * n[2].getTimezoneOffset(),
                    new Date(r.now(!0).getTime() + parseInt(n[1] + "1", 10) * t)) : e ? E.parseDate(e, N.format) : r.now(),
                    r.isValidDate(a) || (a = r.now()),
                    a)
                }
                ,
                r.strToDate = function(e) {
                    if (e && e instanceof Date && r.isValidDate(e))
                        return e;
                    var t = e ? E.parseDate(e, N.formatDate) : r.now(!0);
                    return r.isValidDate(t) || (t = r.now(!0)),
                    t
                }
                ,
                r.strtotime = function(e) {
                    if (e && e instanceof Date && r.isValidDate(e))
                        return e;
                    var t = e ? E.parseDate(e, N.formatTime) : r.now(!0);
                    return r.isValidDate(t) || (t = r.now(!0)),
                    t
                }
                ,
                r.str = function() {
                    var e = N.format;
                    return N.yearOffset && (e = (e = e.replace("Y", r.currentTime.getFullYear() + N.yearOffset)).replace("y", String(r.currentTime.getFullYear() + N.yearOffset).substring(2, 4))),
                    E.formatDate(r.currentTime, e)
                }
                ,
                r.currentTime = this.now()
            }
            ,
            i.on("touchend click", function(e) {
                e.preventDefault(),
                _.data("changed", !0),
                W.setCurrentTime(f()),
                O.val(W.str()),
                _.trigger("close.xdsoft")
            }),
            F.find(".xdsoft_today_button").on("touchend mousedown.xdsoft", function() {
                _.data("changed", !0),
                W.setCurrentTime(0, !0),
                _.trigger("afterOpen.xdsoft")
            }).on("dblclick.xdsoft", function() {
                var e, t, a = W.getCurrentTime();
                a = new Date(a.getFullYear(),a.getMonth(),a.getDate()),
                e = W.strToDate(N.minDate),
                a < (e = new Date(e.getFullYear(),e.getMonth(),e.getDate())) || (t = W.strToDate(N.maxDate),
                (t = new Date(t.getFullYear(),t.getMonth(),t.getDate())) < a || (O.val(W.str()),
                O.trigger("change"),
                _.trigger("close.xdsoft")))
            }),
            F.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft", function() {
                var a = L(this)
                  , n = 0
                  , r = !1;
                !function e(t) {
                    a.hasClass(N.next) ? W.nextMonth() : a.hasClass(N.prev) && W.prevMonth(),
                    N.monthChangeSpinner && (r || (n = setTimeout(e, t || 100)))
                }(500),
                L([N.ownerDocument.body, N.contentWindow]).on("touchend mouseup.xdsoft", function e() {
                    clearTimeout(n),
                    r = !0,
                    L([N.ownerDocument.body, N.contentWindow]).off("touchend mouseup.xdsoft", e)
                })
            }),
            o.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft", function() {
                var o = L(this)
                  , i = 0
                  , s = !1
                  , d = 110;
                !function e(t) {
                    var a = u[0].clientHeight
                      , n = P[0].offsetHeight
                      , r = Math.abs(parseInt(P.css("marginTop"), 10));
                    o.hasClass(N.next) && n - a - N.timeHeightInTimePicker >= r ? P.css("marginTop", "-" + (r + N.timeHeightInTimePicker) + "px") : o.hasClass(N.prev) && 0 <= r - N.timeHeightInTimePicker && P.css("marginTop", "-" + (r - N.timeHeightInTimePicker) + "px"),
                    u.trigger("scroll_element.xdsoft_scroller", [Math.abs(parseInt(P[0].style.marginTop, 10) / (n - a))]),
                    d = 10 < d ? 10 : d - 10,
                    s || (i = setTimeout(e, t || d))
                }(500),
                L([N.ownerDocument.body, N.contentWindow]).on("touchend mouseup.xdsoft", function e() {
                    clearTimeout(i),
                    s = !0,
                    L([N.ownerDocument.body, N.contentWindow]).off("touchend mouseup.xdsoft", e)
                })
            }),
            t = 0,
            _.on("xchange.xdsoft", function(e) {
                clearTimeout(t),
                t = setTimeout(function() {
                    void 0 !== W.currentTime && null !== W.currentTime || (W.currentTime = W.now());
                    for (var e, t, a, n, r, o, i, s, d, u, l = "", f = new Date(W.currentTime.getFullYear(),W.currentTime.getMonth(),1,12,0,0), c = 0, m = W.now(), h = !1, g = !1, p = !1, D = !1, y = [], v = !0, b = ""; f.getDay() !== N.dayOfWeekStart; )
                        f.setDate(f.getDate() - 1);
                    for (l += "<table><thead><tr>",
                    N.weeks && (l += "<th></th>"),
                    e = 0; e < 7; e += 1)
                        l += "<th>" + N.i18n[R].dayOfWeekShort[(e + N.dayOfWeekStart) % 7] + "</th>";
                    for (l += "</tr></thead>",
                    l += "<tbody>",
                    !1 !== N.maxDate && (h = W.strToDate(N.maxDate),
                    h = new Date(h.getFullYear(),h.getMonth(),h.getDate(),23,59,59,999)),
                    !1 !== N.minDate && (g = W.strToDate(N.minDate),
                    g = new Date(g.getFullYear(),g.getMonth(),g.getDate())),
                    !1 !== N.minDateTime && (p = W.strToDate(N.minDateTime),
                    p = new Date(p.getFullYear(),p.getMonth(),p.getDate(),p.getHours(),p.getMinutes(),p.getSeconds())),
                    !1 !== N.maxDateTime && (D = W.strToDate(N.maxDateTime),
                    D = new Date(D.getFullYear(),D.getMonth(),D.getDate(),D.getHours(),D.getMinutes(),D.getSeconds())),
                    !1 !== D && (u = 31 * (12 * D.getFullYear() + D.getMonth()) + D.getDate()); c < W.currentTime.countDaysInMonth() || f.getDay() !== N.dayOfWeekStart || W.currentTime.getMonth() === f.getMonth(); ) {
                        y = [],
                        c += 1,
                        a = f.getDay(),
                        n = f.getDate(),
                        r = f.getFullYear(),
                        M = f.getMonth(),
                        o = W.getWeekOfYear(f),
                        d = "",
                        y.push("xdsoft_date"),
                        i = N.beforeShowDay && L.isFunction(N.beforeShowDay.call) ? N.beforeShowDay.call(_, f) : null,
                        N.allowDateRe && "[object RegExp]" === Object.prototype.toString.call(N.allowDateRe) && (N.allowDateRe.test(E.formatDate(f, N.formatDate)) || y.push("xdsoft_disabled")),
                        N.allowDates && 0 < N.allowDates.length && -1 === N.allowDates.indexOf(E.formatDate(f, N.formatDate)) && y.push("xdsoft_disabled");
                        var k = 31 * (12 * f.getFullYear() + f.getMonth()) + f.getDate();
                        (!1 !== h && h < f || !1 !== p && f < p || !1 !== g && f < g || !1 !== D && u < k || i && !1 === i[0]) && y.push("xdsoft_disabled"),
                        -1 !== N.disabledDates.indexOf(E.formatDate(f, N.formatDate)) && y.push("xdsoft_disabled"),
                        -1 !== N.disabledWeekDays.indexOf(a) && y.push("xdsoft_disabled"),
                        O.is("[disabled]") && y.push("xdsoft_disabled"),
                        i && "" !== i[1] && y.push(i[1]),
                        W.currentTime.getMonth() !== M && y.push("xdsoft_other_month"),
                        (N.defaultSelect || _.data("changed")) && E.formatDate(W.currentTime, N.formatDate) === E.formatDate(f, N.formatDate) && y.push("xdsoft_current"),
                        E.formatDate(m, N.formatDate) === E.formatDate(f, N.formatDate) && y.push("xdsoft_today"),
                        0 !== f.getDay() && 6 !== f.getDay() && -1 === N.weekends.indexOf(E.formatDate(f, N.formatDate)) || y.push("xdsoft_weekend"),
                        void 0 !== N.highlightedDates[E.formatDate(f, N.formatDate)] && (t = N.highlightedDates[E.formatDate(f, N.formatDate)],
                        y.push(void 0 === t.style ? "xdsoft_highlighted_default" : t.style),
                        d = void 0 === t.desc ? "" : t.desc),
                        N.beforeShowDay && L.isFunction(N.beforeShowDay) && y.push(N.beforeShowDay(f)),
                        v && (l += "<tr>",
                        v = !1,
                        N.weeks && (l += "<th>" + o + "</th>")),
                        l += '<td data-date="' + n + '" data-month="' + M + '" data-year="' + r + '" class="xdsoft_date xdsoft_day_of_week' + f.getDay() + " " + y.join(" ") + '" title="' + d + '"><div>' + n + "</div></td>",
                        f.getDay() === N.dayOfWeekStartPrev && (l += "</tr>",
                        v = !0),
                        f.setDate(n + 1)
                    }
                    l += "</tbody></table>",
                    C.html(l),
                    F.find(".xdsoft_label span").eq(0).text(N.i18n[R].months[W.currentTime.getMonth()]),
                    F.find(".xdsoft_label span").eq(1).text(W.currentTime.getFullYear() + N.yearOffset),
                    M = b = "";
                    var x = 0;
                    if (!1 !== N.minTime) {
                        var T = W.strtotime(N.minTime);
                        x = 60 * T.getHours() + T.getMinutes()
                    }
                    var S = 1440;
                    if (!1 !== N.maxTime) {
                        T = W.strtotime(N.maxTime);
                        S = 60 * T.getHours() + T.getMinutes()
                    }
                    if (!1 !== N.minDateTime) {
                        T = W.strToDateTime(N.minDateTime);
                        if (E.formatDate(W.currentTime, N.formatDate) === E.formatDate(T, N.formatDate)) {
                            var M = 60 * T.getHours() + T.getMinutes();
                            x < M && (x = M)
                        }
                    }
                    if (!1 !== N.maxDateTime) {
                        T = W.strToDateTime(N.maxDateTime);
                        if (E.formatDate(W.currentTime, N.formatDate) === E.formatDate(T, N.formatDate))
                            (M = 60 * T.getHours() + T.getMinutes()) < S && (S = M)
                    }
                    if (s = function(e, t) {
                        var a, n = W.now(), r = N.allowTimes && L.isArray(N.allowTimes) && N.allowTimes.length;
                        n.setHours(e),
                        e = parseInt(n.getHours(), 10),
                        n.setMinutes(t),
                        t = parseInt(n.getMinutes(), 10),
                        y = [];
                        var o = 60 * e + t;
                        (O.is("[disabled]") || S <= o || o < x) && y.push("xdsoft_disabled"),
                        (a = new Date(W.currentTime)).setHours(parseInt(W.currentTime.getHours(), 10)),
                        r || a.setMinutes(Math[N.roundTime](W.currentTime.getMinutes() / N.step) * N.step),
                        (N.initTime || N.defaultSelect || _.data("changed")) && a.getHours() === parseInt(e, 10) && (!r && 59 < N.step || a.getMinutes() === parseInt(t, 10)) && (N.defaultSelect || _.data("changed") ? y.push("xdsoft_current") : N.initTime && y.push("xdsoft_init_time")),
                        parseInt(m.getHours(), 10) === parseInt(e, 10) && parseInt(m.getMinutes(), 10) === parseInt(t, 10) && y.push("xdsoft_today"),
                        b += '<div class="xdsoft_time ' + y.join(" ") + '" data-hour="' + e + '" data-minute="' + t + '">' + E.formatDate(n, N.formatTime) + "</div>"
                    }
                    ,
                    N.allowTimes && L.isArray(N.allowTimes) && N.allowTimes.length)
                        for (c = 0; c < N.allowTimes.length; c += 1)
                            s(W.strtotime(N.allowTimes[c]).getHours(), M = W.strtotime(N.allowTimes[c]).getMinutes());
                    else
                        for (e = c = 0; c < (N.hours12 ? 12 : 24); c += 1)
                            for (e = 0; e < 60; e += N.step) {
                                var w = 60 * c + e;
                                w < x || (S <= w || s((c < 10 ? "0" : "") + c, M = (e < 10 ? "0" : "") + e))
                            }
                    for (P.html(b),
                    H = "",
                    c = parseInt(N.yearStart, 10); c <= parseInt(N.yearEnd, 10); c += 1)
                        H += '<div class="xdsoft_option ' + (W.currentTime.getFullYear() === c ? "xdsoft_current" : "") + '" data-value="' + c + '">' + (c + N.yearOffset) + "</div>";
                    for (A.children().eq(0).html(H),
                    c = parseInt(N.monthStart, 10),
                    H = ""; c <= parseInt(N.monthEnd, 10); c += 1)
                        H += '<div class="xdsoft_option ' + (W.currentTime.getMonth() === c ? "xdsoft_current" : "") + '" data-value="' + c + '">' + N.i18n[R].months[c] + "</div>";
                    Y.children().eq(0).html(H),
                    L(_).trigger("generate.xdsoft")
                }, 10),
                e.stopPropagation()
            }).on("afterOpen.xdsoft", function() {
                var e, t, a, n;
                N.timepicker && (P.find(".xdsoft_current").length ? e = ".xdsoft_current" : P.find(".xdsoft_init_time").length && (e = ".xdsoft_init_time"),
                e ? (t = u[0].clientHeight,
                (a = P[0].offsetHeight) - t < (n = P.find(e).index() * N.timeHeightInTimePicker + 1) && (n = a - t),
                u.trigger("scroll_element.xdsoft_scroller", [parseInt(n, 10) / (a - t)])) : u.trigger("scroll_element.xdsoft_scroller", [0]))
            }),
            n = 0,
            C.on("touchend click.xdsoft", "td", function(e) {
                e.stopPropagation(),
                n += 1;
                var t = L(this)
                  , a = W.currentTime;
                if (null == a && (W.currentTime = W.now(),
                a = W.currentTime),
                t.hasClass("xdsoft_disabled"))
                    return !1;
                a.setDate(1),
                a.setFullYear(t.data("year")),
                a.setMonth(t.data("month")),
                a.setDate(t.data("date")),
                _.trigger("select.xdsoft", [a]),
                O.val(W.str()),
                N.onSelectDate && L.isFunction(N.onSelectDate) && N.onSelectDate.call(_, W.currentTime, _.data("input"), e),
                _.data("changed", !0),
                _.trigger("xchange.xdsoft"),
                _.trigger("changedatetime.xdsoft"),
                (1 < n || !0 === N.closeOnDateSelect || !1 === N.closeOnDateSelect && !N.timepicker) && !N.inline && _.trigger("close.xdsoft"),
                setTimeout(function() {
                    n = 0
                }, 200)
            }),
            P.on("touchstart", "div", function(e) {
                this.touchMoved = !1
            }).on("touchmove", "div", l).on("touchend click.xdsoft", "div", function(e) {
                if (!this.touchMoved) {
                    e.stopPropagation();
                    var t = L(this)
                      , a = W.currentTime;
                    if (null == a && (W.currentTime = W.now(),
                    a = W.currentTime),
                    t.hasClass("xdsoft_disabled"))
                        return !1;
                    a.setHours(t.data("hour")),
                    a.setMinutes(t.data("minute")),
                    _.trigger("select.xdsoft", [a]),
                    _.data("input").val(W.str()),
                    N.onSelectTime && L.isFunction(N.onSelectTime) && N.onSelectTime.call(_, W.currentTime, _.data("input"), e),
                    _.data("changed", !0),
                    _.trigger("xchange.xdsoft"),
                    _.trigger("changedatetime.xdsoft"),
                    !0 !== N.inline && !0 === N.closeOnTimeSelect && _.trigger("close.xdsoft")
                }
            }),
            g.on("mousewheel.xdsoft", function(e) {
                return !N.scrollMonth || (e.deltaY < 0 ? W.nextMonth() : W.prevMonth(),
                !1)
            }),
            O.on("mousewheel.xdsoft", function(e) {
                return !N.scrollInput || (!N.datepicker && N.timepicker ? (0 <= (a = P.find(".xdsoft_current").length ? P.find(".xdsoft_current").eq(0).index() : 0) + e.deltaY && a + e.deltaY < P.children().length && (a += e.deltaY),
                P.children().eq(a).length && P.children().eq(a).trigger("mousedown"),
                !1) : N.datepicker && !N.timepicker ? (g.trigger(e, [e.deltaY, e.deltaX, e.deltaY]),
                O.val && O.val(W.str()),
                _.trigger("changedatetime.xdsoft"),
                !1) : void 0)
            }),
            _.on("changedatetime.xdsoft", function(e) {
                if (N.onChangeDateTime && L.isFunction(N.onChangeDateTime)) {
                    var t = _.data("input");
                    N.onChangeDateTime.call(_, W.currentTime, t, e),
                    delete N.value,
                    t.trigger("change")
                }
            }).on("generate.xdsoft", function() {
                N.onGenerate && L.isFunction(N.onGenerate) && N.onGenerate.call(_, W.currentTime, _.data("input")),
                s && (_.trigger("afterOpen.xdsoft"),
                s = !1)
            }).on("click.xdsoft", function(e) {
                e.stopPropagation()
            }),
            a = 0,
            h = function(e, t) {
                do {
                    if (!(e = e.parentNode) || !1 === t(e))
                        break
                } while ("HTML" !== e.nodeName)
            }
            ,
            r = function() {
                var e, t, a, n, r, o, i, s, d, u, l, f, c;
                if (e = (s = _.data("input")).offset(),
                t = s[0],
                u = "top",
                a = e.top + t.offsetHeight - 1,
                n = e.left,
                r = "absolute",
                d = L(N.contentWindow).width(),
                f = L(N.contentWindow).height(),
                c = L(N.contentWindow).scrollTop(),
                N.ownerDocument.documentElement.clientWidth - e.left < g.parent().outerWidth(!0)) {
                    var m = g.parent().outerWidth(!0) - t.offsetWidth;
                    n -= m
                }
                "rtl" === s.parent().css("direction") && (n -= _.outerWidth() - s.outerWidth()),
                N.fixed ? (a -= c,
                n -= L(N.contentWindow).scrollLeft(),
                r = "fixed") : (i = !1,
                h(t, function(e) {
                    return null !== e && ("fixed" === N.contentWindow.getComputedStyle(e).getPropertyValue("position") ? !(i = !0) : void 0)
                }),
                i && !N.insideParent ? (r = "fixed",
                a + _.outerHeight() > f + c ? (u = "bottom",
                a = f + c - e.top) : a -= c) : a + _[0].offsetHeight > f + c && (a = e.top - _[0].offsetHeight + 1),
                a < 0 && (a = 0),
                n + t.offsetWidth > d && (n = d - t.offsetWidth)),
                o = _[0],
                h(o, function(e) {
                    if ("relative" === N.contentWindow.getComputedStyle(e).getPropertyValue("position") && d >= e.offsetWidth)
                        return n -= (d - e.offsetWidth) / 2,
                        !1
                }),
                l = {
                    position: r,
                    left: N.insideParent ? t.offsetLeft : n,
                    top: "",
                    bottom: ""
                },
                N.insideParent ? l[u] = t.offsetTop + t.offsetHeight : l[u] = a,
                _.css(l)
            }
            ,
            _.on("open.xdsoft", function(e) {
                var t = !0;
                N.onShow && L.isFunction(N.onShow) && (t = N.onShow.call(_, W.currentTime, _.data("input"), e)),
                !1 !== t && (_.show(),
                r(),
                L(N.contentWindow).off("resize.xdsoft", r).on("resize.xdsoft", r),
                N.closeOnWithoutClick && L([N.ownerDocument.body, N.contentWindow]).on("touchstart mousedown.xdsoft", function e() {
                    _.trigger("close.xdsoft"),
                    L([N.ownerDocument.body, N.contentWindow]).off("touchstart mousedown.xdsoft", e)
                }))
            }).on("close.xdsoft", function(e) {
                var t = !0;
                F.find(".xdsoft_month,.xdsoft_year").find(".xdsoft_select").hide(),
                N.onClose && L.isFunction(N.onClose) && (t = N.onClose.call(_, W.currentTime, _.data("input"), e)),
                !1 === t || N.opened || N.inline || _.hide(),
                e.stopPropagation()
            }).on("toggle.xdsoft", function() {
                _.is(":visible") ? _.trigger("close.xdsoft") : _.trigger("open.xdsoft")
            }).data("input", O),
            d = 0,
            _.data("xdsoft_datetime", W),
            _.setOptions(N),
            W.setCurrentTime(f()),
            O.data("xdsoft_datetimepicker", _).on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", function() {
                O.is(":disabled") || O.data("xdsoft_datetimepicker").is(":visible") && N.closeOnInputClick || N.openOnFocus && (clearTimeout(d),
                d = setTimeout(function() {
                    O.is(":disabled") || (s = !0,
                    W.setCurrentTime(f(), !0),
                    N.mask && c(N),
                    _.trigger("open.xdsoft"))
                }, 100))
            }).on("keydown.xdsoft", function(e) {
                var t, a = e.which;
                return -1 !== [D].indexOf(a) && N.enterLikeTab ? (t = L("input:visible,textarea:visible,button:visible,a:visible"),
                _.trigger("close.xdsoft"),
                t.eq(t.index(this) + 1).focus(),
                !1) : -1 !== [T].indexOf(a) ? (_.trigger("close.xdsoft"),
                !0) : void 0
            }).on("blur.xdsoft", function() {
                _.trigger("close.xdsoft")
            })
        }
        ,
        r = function(e) {
            var t = e.data("xdsoft_datetimepicker");
            t && (t.data("xdsoft_datetime", null),
            t.remove(),
            e.data("xdsoft_datetimepicker", null).off(".xdsoft"),
            L(N.contentWindow).off("resize.xdsoft"),
            L([N.contentWindow, N.ownerDocument.body]).off("mousedown.xdsoft touchstart"),
            e.unmousewheel && e.unmousewheel())
        }
        ,
        L(N.ownerDocument).off("keydown.xdsoftctrl keyup.xdsoftctrl").off("keydown.xdsoftcmd keyup.xdsoftcmd").on("keydown.xdsoftctrl", function(e) {
            e.keyCode === p && (I = !0)
        }).on("keyup.xdsoftctrl", function(e) {
            e.keyCode === p && (I = !1)
        }).on("keydown.xdsoftcmd", function(e) {
            91 === e.keyCode && !0
        }).on("keyup.xdsoftcmd", function(e) {
            91 === e.keyCode && !1
        }),
        this.each(function() {
            var t, e = L(this).data("xdsoft_datetimepicker");
            if (e) {
                if ("string" === L.type(H))
                    switch (H) {
                    case "show":
                        L(this).select().focus(),
                        e.trigger("open.xdsoft");
                        break;
                    case "hide":
                        e.trigger("close.xdsoft");
                        break;
                    case "toggle":
                        e.trigger("toggle.xdsoft");
                        break;
                    case "destroy":
                        r(L(this));
                        break;
                    case "reset":
                        this.value = this.defaultValue,
                        this.value && e.data("xdsoft_datetime").isValidDate(E.parseDate(this.value, N.format)) || e.data("changed", !1),
                        e.data("xdsoft_datetime").setCurrentTime(this.value);
                        break;
                    case "validate":
                        e.data("input").trigger("blur.xdsoft");
                        break;
                    default:
                        e[H] && L.isFunction(e[H]) && (o = e[H](a))
                    }
                else
                    e.setOptions(H);
                return 0
            }
            "string" !== L.type(H) && (!N.lazyInit || N.open || N.inline ? n(L(this)) : (t = L(this)).on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", function e() {
                t.is(":disabled") || t.data("xdsoft_datetimepicker") || (clearTimeout(i),
                i = setTimeout(function() {
                    t.data("xdsoft_datetimepicker") || n(t),
                    t.off("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", e).trigger("open.xdsoft")
                }, 100))
            }))
        }),
        o
    }
    ,
    L.fn.datetimepicker.defaults = s
};
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "jquery-mousewheel"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(datetimepickerFactory),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function(c) {
    var m, h, e = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], t = "onwheel"in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], g = Array.prototype.slice;
    if (c.event.fixHooks)
        for (var a = e.length; a; )
            c.event.fixHooks[e[--a]] = c.event.mouseHooks;
    var p = c.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var e = t.length; e; )
                    this.addEventListener(t[--e], n, !1);
            else
                this.onmousewheel = n;
            c.data(this, "mousewheel-line-height", p.getLineHeight(this)),
            c.data(this, "mousewheel-page-height", p.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var e = t.length; e; )
                    this.removeEventListener(t[--e], n, !1);
            else
                this.onmousewheel = null;
            c.removeData(this, "mousewheel-line-height"),
            c.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(e) {
            var t = c(e)
              , a = t["offsetParent"in c.fn ? "offsetParent" : "parent"]();
            return a.length || (a = c("body")),
            parseInt(a.css("fontSize"), 10) || parseInt(t.css("fontSize"), 10) || 16
        },
        getPageHeight: function(e) {
            return c(e).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    function n(e) {
        var t, a = e || window.event, n = g.call(arguments, 1), r = 0, o = 0, i = 0, s = 0, d = 0;
        if ((e = c.event.fix(a)).type = "mousewheel",
        "detail"in a && (i = -1 * a.detail),
        "wheelDelta"in a && (i = a.wheelDelta),
        "wheelDeltaY"in a && (i = a.wheelDeltaY),
        "wheelDeltaX"in a && (o = -1 * a.wheelDeltaX),
        "axis"in a && a.axis === a.HORIZONTAL_AXIS && (o = -1 * i,
        i = 0),
        r = 0 === i ? o : i,
        "deltaY"in a && (r = i = -1 * a.deltaY),
        "deltaX"in a && (o = a.deltaX,
        0 === i && (r = -1 * o)),
        0 !== i || 0 !== o) {
            if (1 === a.deltaMode) {
                var u = c.data(this, "mousewheel-line-height");
                r *= u,
                i *= u,
                o *= u
            } else if (2 === a.deltaMode) {
                var l = c.data(this, "mousewheel-page-height");
                r *= l,
                i *= l,
                o *= l
            }
            if (t = Math.max(Math.abs(i), Math.abs(o)),
            (!h || t < h) && y(a, h = t) && (h /= 40),
            y(a, t) && (r /= 40,
            o /= 40,
            i /= 40),
            r = Math[1 <= r ? "floor" : "ceil"](r / h),
            o = Math[1 <= o ? "floor" : "ceil"](o / h),
            i = Math[1 <= i ? "floor" : "ceil"](i / h),
            p.settings.normalizeOffset && this.getBoundingClientRect) {
                var f = this.getBoundingClientRect();
                s = e.clientX - f.left,
                d = e.clientY - f.top
            }
            return e.deltaX = o,
            e.deltaY = i,
            e.deltaFactor = h,
            e.offsetX = s,
            e.offsetY = d,
            e.deltaMode = 0,
            n.unshift(e, r, o, i),
            m && clearTimeout(m),
            m = setTimeout(D, 200),
            (c.event.dispatch || c.event.handle).apply(this, n)
        }
    }
    function D() {
        h = null
    }
    function y(e, t) {
        return p.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
    }
    c.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
});
var hq_locations = [{
    "id": "11",
    "brandId": "6",
    "name": "\u0110\u1ecba \u0111i\u1ec3m c\u1ee7a b\u1ea1n t\u1ea1i H\u00e0 Giang"
}, {
    "id": "9",
    "brandId": "2",
    "name": "\u0110\u1ecba ch\u1ec9 c\u1ee7a b\u1ea1n t\u1ea1i H\u00e0 N\u1ed9i"
}, {
    "id": "12",
    "brandId": "6",
    "name": "tho\u0302n L\u00e2m \u0110\u1ed3ng, Xa\u0303 Phu\u031bo\u031bng Thie\u0323\u0302n, Ha\u0300 Giang"
}, {
    "id": "15",
    "brandId": "2",
    "name": "MOTOGO g\u1ea7n s\u00e2n bay N\u1ed9i B\u00e0i - HN"
}, {
    "id": "4",
    "brandId": "2",
    "name": "81 Nguy\u1ec5n Kh\u1ea3 Tr\u1ea1c, Mai D\u1ecbch, C\u1ea7u Gi\u1ea5y, H\u00e0 N\u1ed9i"
}, {
    "id": "3",
    "brandId": "2",
    "name": "1081 H\u1ed3ng H\u00e0, Ho\u00e0n Ki\u1ebfm, H\u00e0 N\u1ed9i"
}];
var hq_brands = [{
    "id": "1",
    "link": ""
}, {
    "id": "2",
    "link": ""
}, {
    "id": "3",
    "link": ""
}, {
    "id": "5",
    "link": ""
}, {
    "id": "6",
    "link": ""
}];
(function($) {
    $("#pick_up_location").select2();
    $("#return_location").select2();
    $('#same-return').on('change', function() {
        if ($('#same-return').is(':checked')) {
            $("#return_loc_wrapper").addClass("disabled");
            getReturnLocations()
        } else {
            $("#return_loc_wrapper").removeClass("disabled");
            getReturnLocations()
        }
    })
    document.getElementById("booking-form-submit").onclick = function() {
        var pickup_location = $('#pick_up_location').val();
        var return_location = $('#return_location').val();
        var pickup_date_val = $('#hq-pickup-date-input').val();
        var return_date_val = $('#hq-return-date-input').val();
        var error = !1;
        if (pickup_location == null || pickup_location == 0) {
            error = !0
        }
        if (return_location == null || return_location == 0) {
            error = !0
        }
        if (pickup_date_val == '') {
            error = !0
        }
        if (return_date_val == '') {
            error = !0
        }
        if (error == !1) {
            document.getElementById("hq-book-form").submit()
        }
    }
    var formatDate = 'd/m/Y H:i';
    var d = new Date();
    var month = d.getMonth();
    var day = d.getDate();
    var year = d.getFullYear();
    var tomorrow = '+1970/01/02';
    $("#hq-return-date-input").prop('disabled', !0);
    var pickerConfigPickup = {
        format: formatDate,
        closeOnDateSelect: !1,
        minDate: tomorrow,
        defaultDate: tomorrow,
        onChangeDateTime: function(pickUpDateSelected) {
            $("#hq-return-date-input").prop('disabled', !1);
            $("#hq-return-date-input").datetimepicker({
                minDate: pickUpDateSelected
            })
        },
        validateOnBlur: !1,
    };
    var pickerConfigReturn = {
        defaultSelect: !1,
        format: formatDate,
        closeOnDateSelect: !1,
        validateOnBlur: !1
    };
    $('#hq-pickup-date-input').datetimepicker(pickerConfigPickup);
    $('#hq-return-date-input').datetimepicker(pickerConfigReturn);
    var formActions = [{
        brandId: 1,
        action: '/reservation-motogo'
    }, {
        brandId: 2,
        action: '/reservation-hanoi'
    }, {
        brandId: 3,
        action: '/reservation-ninhbinh'
    }, {
        brandId: 4,
        action: '/reservation-hue'
    }, {
        brandId: 6,
        action: '/reservation-hagiang'
    }, ]
    $('#pick_up_location').on('change', function() {
        getReturnLocations()
    });
    function getReturnLocations() {
        var locationOptions = '<option value ="0">Chọn điểm trả xe:</option>';
        if ($('#pick_up_location').val() != 0) {
            var link;
            var brandId;
            hq_locations.forEach(function(location) {
                if (location.id == $('#pick_up_location').val()) {
                    hq_brands.forEach(function(brand) {
                        if (location.brandId == brand.id) {
                            brandId = brand.id;
                            formActions.forEach(function(red) {
                                if (red.brandId == brandId) {
                                    link = red.action
                                }
                            })
                        }
                    })
                }
            });
            hq_locations.forEach(function(loc) {
                if (loc.brandId == brandId) {
                    if ($('#same-return').is(':checked') == !1) {
                        locationOptions += '<option value="' + loc.id + '">' + loc.name + '</option>'
                    } else {
                        if ($('#pick_up_location').val() == loc.id) {
                            locationOptions += '<option value="' + loc.id + '" selected>' + loc.name + '</option>'
                        } else {
                            locationOptions += '<option value="' + loc.id + '">' + loc.name + '</option>'
                        }
                    }
                }
            })
            $('#return_location option').remove();
            $("#return_location").append(locationOptions);
            if ($('#same-return').is(':checked') == !1) {
                $("#return_location").prop("disabled", !1)
            }
            $("#hq-book-form").attr("action", link)
        } else {
            $('#return_location option').remove();
            $("#return_location").append(locationOptions);
            $("#return_location").prop("disabled", !0);
            $("#hq-book-form").attr("action", "#")
        }
    }
}
)(jQuery);
function lazyLoadThumb(e) {
    var t = '<img loading="lazy" data-lazy-src="https://i.ytimg.com/vi/ID/hqdefault.jpg" alt="" width="480" height="360"><noscript><img src="https://i.ytimg.com/vi/ID/hqdefault.jpg" alt="" width="480" height="360"></noscript>'
      , a = '<div class="play"></div>';
    return t.replace("ID", e) + a
}
function lazyLoadYoutubeIframe() {
    var e = document.createElement("iframe")
      , t = "ID?autoplay=1";
    t += 0 === this.dataset.query.length ? '' : '&' + this.dataset.query;
    e.setAttribute("src", t.replace("ID", this.dataset.src)),
    e.setAttribute("frameborder", "0"),
    e.setAttribute("allowfullscreen", "1"),
    e.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"),
    this.parentNode.replaceChild(e, this)
}
document.addEventListener("DOMContentLoaded", function() {
    var e, t, a = document.getElementsByClassName("rll-youtube-player");
    for (t = 0; t < a.length; t++)
        e = document.createElement("div"),
        e.setAttribute("data-id", a[t].dataset.id),
        e.setAttribute("data-query", a[t].dataset.query),
        e.setAttribute("data-src", a[t].dataset.src),
        e.innerHTML = lazyLoadThumb(a[t].dataset.id),
        e.onclick = lazyLoadYoutubeIframe,
        a[t].appendChild(e)
});
;jQuery(document).ready(function($) {
    var list_moto = $('.s-list-moto .list-moto');
    if (list_moto.children('.moto-item').length > 4) {
        list_moto.slick({
            infinite: !0,
            arrows: !1,
            dots: !0,
            slidesToShow: 3,
            slidesToScroll: 1
        })
    }
})
