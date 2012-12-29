function edit_quote(id_quote) {
    var IdQuoteHtml = "#" + id_quote;
    var id_quote_int = id_quote.substr(6);  
    var txt_quote = $(IdQuoteHtml).html();

    var htmlForm = "<form action=\"/admin.php?action=rate\" method=\"post\" id=\"edit_quote_admin\">";
    htmlForm += "<textarea class=\"uniform\" style=\"width:100%; height:50px;\" name=\"texte_quote\" id=\"texte_quote\">" + txt_quote + "</textarea>";
    htmlForm += "<input type=\"hidden\" name=\"id\" id=\"id_quote\" value=\"" + id_quote_int + "\"/><br/>";
    htmlForm += "<input class=\"submit\" type=\"submit\" value=\"Edit this quote\"/>";
    htmlForm += " </form>";

    $(IdQuoteHtml).html(htmlForm);
}

$("#edit_quote_admin").live("submit", function (event) {
    event.preventDefault();
    var form = $(this);
    var id_quote = $("form#edit_quote_admin input#id_quote").val();
    var texte_quote = $("form#edit_quote_admin textarea#texte_quote").val();
    console.log(id_quote);

    $.ajax({
        url: form.attr('action'), // Get the action URL to send AJAX to
        type: "POST",
        data: {
            id: id_quote,
            texte_quote: texte_quote,
            approve: 'yes',
            edit: 'yes'
        },
        success: function (result) {
            $(".admin_quote[data-id=" + id_quote + "]").html('Updated');
            $(".grey_post[data-id=" + id_quote + "]").delay(500).slideUp(500)

            var numberOfQuoteAwaitingMode = parseInt($("#awaitingModeQuote").html()) - 1;
            $("#awaitingModeQuote").html(numberOfQuoteAwaitingMode);
        }
    });
});

$(".hide").click(function () {
    $(".profile_not_fullfilled").slideUp("slow")
});
$(".hide_this").click(function () {
    $(this).slideUp("slow")
});
$(function () {
    $('.slidedown').slideDown(1500)
});

function hide_profile_not_fullfilled() {
    $.ajax({
        type: 'POST',
        url: 'http://teen-quotes.com/ajax/hide_profile_not_fullfilled.php'
    });
    return false
};

function favorite(id_quote, id_user) {
    $(".favorite[data-id=" + id_quote + "]").html("<em>Wait...</em>");
    $.ajax({
        type: 'post',
        url: 'http://teen-quotes.com/ajax/favorite.php',
        data: {
            id_quote: id_quote,
            id_user: id_user
        },
        success: function (data) {
            $(".favorite[data-id=" + id_quote + "]").hide().html("<span class=\"hide_this\" data-id=" + id_quote + ">" + data + "</span><span class=\"show_this\" data-id=" + id_quote + "><a href=\"\"  onclick=\"unfavorite(" + id_quote + "," + id_user + "); return false;\" title=\"Delete this quote from your favorites\"><span class=\"heart_fav off\"></span></a></span>").fadeIn(1000);
            $(".favorite[data-id=" + id_quote + "]").css("opacity", "0.5");
            $(".show_this[data-id=" + id_quote + "]").hide().delay(3000).fadeIn(1000);
            $(".hide_this[data-id=" + id_quote + "]").delay(2000).fadeOut(1000)
        }
    });
    return false
}

function unfavorite(id_quote, id_user) {
    $(".favorite[data-id=" + id_quote + "]").html("<em>Wait...</em>");
    $.ajax({
        type: 'post',
        url: 'http://teen-quotes.com/ajax/unfavorite.php',
        data: {
            id_quote: id_quote,
            id_user: id_user
        },
        success: function (data) {
            $(".favorite[data-id=" + id_quote + "]").hide().html("<span class=\"hide_this\" data-id=" + id_quote + ">" + data + "</span><span class=\"show_this\" data-id=" + id_quote + "><a href=\"\"  onclick=\"favorite(" + id_quote + "," + id_user + "); return false;\" title=\"Add this quote to your favorites !\"><span class=\"heart_fav on\"></span></span>").fadeIn(1000);
            $(".favorite[data-id=" + id_quote + "]").css("opacity", "0.5");
            $(".show_this[data-id=" + id_quote + "]").hide().delay(3000).fadeIn(1000);
            $(".hide_this[data-id=" + id_quote + "]").delay(2000).fadeOut(1000)
        }
    });
    return false
}

function admin_quote(approve, id_quote, id_user) {
    $(".admin_quote[data-id=" + id_quote + "]").html("<em>Wait...</em>");
    $.ajax({
        type: 'post',
        url: 'http://teen-quotes.com/ajax/admin_quote.php',
        data: {
            id_quote: id_quote,
            id_user: id_user,
            approve: approve
        },
        success: function (data) {
            $(".admin_quote[data-id=" + id_quote + "]").html(data);
            $(".grey_post[data-id=" + id_quote + "]").delay(500).slideUp(500)

            var numberOfQuoteAwaitingMode = parseInt($("#awaitingModeQuote").html()) - 1;
            $("#awaitingModeQuote").html(numberOfQuoteAwaitingMode);
        }
    });
    return false
}

function HTMLentities(texte) {
    texte = texte.replace(/"/g, '&quot;');
    texte = texte.replace(/&/g, '&amp;');
    texte = texte.replace(/\'/g, '&#39;');
    texte = texte.replace(/</g, '&lt;');
    texte = texte.replace(/>/g, '&gt;');
    texte = texte.replace(/\^/g, '&circ;');
    texte = texte.replace(/‘/g, '&lsquo;');
    texte = texte.replace(/’/g, '&rsquo;');
    texte = texte.replace(/“/g, '&ldquo;');
    texte = texte.replace(/”/g, '&rdquo;');
    texte = texte.replace(/•/g, '&bull;');
    texte = texte.replace(/–/g, '&ndash;');
    texte = texte.replace(/—/g, '&mdash;');
    texte = texte.replace(/˜/g, '&tilde;');
    texte = texte.replace(/™/g, '&trade;');
    texte = texte.replace(/š/g, '&scaron;');
    texte = texte.replace(/›/g, '&rsaquo;');
    texte = texte.replace(/œ/g, '&oelig;');
    texte = texte.replace(//g, '&#357;');
    texte = texte.replace(/ž/g, '&#382;');
    texte = texte.replace(/Ÿ/g, '&Yuml;');
    texte = texte.replace(/¡/g, '&iexcl;');
    texte = texte.replace(/¢/g, '&cent;');
    texte = texte.replace(/£/g, '&pound;');
    texte = texte.replace(/¥/g, '&yen;');
    texte = texte.replace(/¦/g, '&brvbar;');
    texte = texte.replace(/§/g, '&sect;');
    texte = texte.replace(/¨/g, '&uml;');
    texte = texte.replace(/©/g, '&copy;');
    texte = texte.replace(/ª/g, '&ordf;');
    texte = texte.replace(/«/g, '&laquo;');
    texte = texte.replace(/¬/g, '&not;');
    texte = texte.replace(/­/g, '&shy;');
    texte = texte.replace(/®/g, '&reg;');
    texte = texte.replace(/¯/g, '&macr;');
    texte = texte.replace(/°/g, '&deg;');
    texte = texte.replace(/±/g, '&plusmn;');
    texte = texte.replace(/²/g, '&sup2;');
    texte = texte.replace(/³/g, '&sup3;');
    texte = texte.replace(/´/g, '&acute;');
    texte = texte.replace(/µ/g, '&micro;');
    texte = texte.replace(/¶/g, '&para');
    texte = texte.replace(/·/g, '&middot;');
    texte = texte.replace(/¸/g, '&cedil;');
    texte = texte.replace(/¹/g, '&sup1;');
    texte = texte.replace(/º/g, '&ordm;');
    texte = texte.replace(/»/g, '&raquo;');
    texte = texte.replace(/¼/g, '&frac14;');
    texte = texte.replace(/½/g, '&frac12;');
    texte = texte.replace(/¾/g, '&frac34;');
    texte = texte.replace(/¿/g, '&iquest;');
    texte = texte.replace(/À/g, '&Agrave;');
    texte = texte.replace(/Á/g, '&Aacute;');
    texte = texte.replace(/Â/g, '&Acirc;');
    texte = texte.replace(/Ã/g, '&Atilde;');
    texte = texte.replace(/Ä/g, '&Auml;');
    texte = texte.replace(/Å/g, '&Aring;');
    texte = texte.replace(/Æ/g, '&AElig;');
    texte = texte.replace(/Ç/g, '&Ccedil;');
    texte = texte.replace(/È/g, '&Egrave;');
    texte = texte.replace(/É/g, '&Eacute;');
    texte = texte.replace(/Ê/g, '&Ecirc;');
    texte = texte.replace(/Ë/g, '&Euml;');
    texte = texte.replace(/Ì/g, '&Igrave;');
    texte = texte.replace(/Í/g, '&Iacute;');
    texte = texte.replace(/Î/g, '&Icirc;');
    texte = texte.replace(/Ï/g, '&Iuml;');
    texte = texte.replace(/Ð/g, '&ETH;');
    texte = texte.replace(/Ñ/g, '&Ntilde;');
    texte = texte.replace(/Ò/g, '&Ograve;');
    texte = texte.replace(/Ó/g, '&Oacute;');
    texte = texte.replace(/Ô/g, '&Ocirc;');
    texte = texte.replace(/Õ/g, '&Otilde;');
    texte = texte.replace(/Ö/g, '&Ouml;');
    texte = texte.replace(/×/g, '&times;');
    texte = texte.replace(/Ø/g, '&Oslash;');
    texte = texte.replace(/Ù/g, '&Ugrave;');
    texte = texte.replace(/Ú/g, '&Uacute;');
    texte = texte.replace(/Û/g, '&Ucirc;');
    texte = texte.replace(/Ü/g, '&Uuml;');
    texte = texte.replace(/Ý/g, '&Yacute;');
    texte = texte.replace(/Þ/g, '&THORN;');
    texte = texte.replace(/ß/g, '&szlig;');
    texte = texte.replace(/à/g, '&aacute;');
    texte = texte.replace(/á/g, '&aacute;');
    texte = texte.replace(/â/g, '&acirc;');
    texte = texte.replace(/ã/g, '&atilde;');
    texte = texte.replace(/ä/g, '&auml;');
    texte = texte.replace(/å/g, '&aring;');
    texte = texte.replace(/æ/g, '&aelig;');
    texte = texte.replace(/ç/g, '&ccedil;');
    texte = texte.replace(/è/g, '&egrave;');
    texte = texte.replace(/é/g, '&eacute;');
    texte = texte.replace(/ê/g, '&ecirc;');
    texte = texte.replace(/ë/g, '&euml;');
    texte = texte.replace(/ì/g, '&igrave;');
    texte = texte.replace(/í/g, '&iacute;');
    texte = texte.replace(/î/g, '&icirc;');
    texte = texte.replace(/ï/g, '&iuml;');
    texte = texte.replace(/ð/g, '&eth;');
    texte = texte.replace(/ñ/g, '&ntilde;');
    texte = texte.replace(/ò/g, '&ograve;');
    texte = texte.replace(/ó/g, '&oacute;');
    texte = texte.replace(/ô/g, '&ocirc;');
    texte = texte.replace(/õ/g, '&otilde;');
    texte = texte.replace(/ö/g, '&ouml;');
    texte = texte.replace(/÷/g, '&divide;');
    texte = texte.replace(/ø/g, '&oslash;');
    texte = texte.replace(/ù/g, '&ugrave;');
    texte = texte.replace(/ú/g, '&uacute;');
    texte = texte.replace(/û/g, '&ucirc;');
    texte = texte.replace(/ü/g, '&uuml;');
    texte = texte.replace(/ý/g, '&yacute;');
    texte = texte.replace(/þ/g, '&thorn;');
    texte = texte.replace(/ÿ/g, '&yuml;');
    return texte
}
var isG = false;
$(document).keydown(function (e) {
    if (e.which == 71 || e.keyCode == 71) {
        isG = true
    }
}).keyup(function (e) {
    if ($('input:focus').length > 0 || $('textarea:focus').length > 0 || isG != true) {
        isG = false;
        return false
    }
    if (e.keyCode == true) {
        var key = e.keyCode
    } else {
        var key = e.which
    }
    switch (key) {
        case 81:
            window.location.href = "../admin";
            return false;
            break;
        case 65:
            window.location.href = "../addquote";
            return false;
            break;
        case 69:
            window.location.href = "../editprofile";
            return false;
            break;
        case 72:
            window.location.href = "../";
            return false;
            break;
        case 82:
            window.location.href = "../random";
            return false;
            break;
        case 80:
            window.location.href = "../profile";
            return false;
            break;
        case 77:
            window.location.href = "../members";
            return false;
            break;
        case 76:
            window.location.href = "../?deconnexion";
            return false;
            break;
        case 84:
            window.location.href = "http://teen-quotes.com";
            return false;
            break;
        case 75:
            window.location.href = "http://kotado.fr";
            return false;
            break
    }
    isG = false
});
$(function () {
    $("#submit_translate").click(function () {
        $(".translate_quote[data-id=" + id_quote + "]").html("<em>Wait...</em>");
        var id_quote = $("input#id_quote").val();
        var texte_quote_translate = HTMLentities($("textarea#texte_quote_translate").val());
        var language_translate = $("input#language_translate").val();
        var language_source = $("input#language_source").val();
        $.ajax({
            type: "POST",
            url: 'http://teen-quotes.com/ajax/translate_quote.php',
            data: {
                id_quote: id_quote,
                texte_quote_translate: texte_quote_translate,
                language_source: language_source,
                language_translate: language_translate
            },
            success: function (data) {
                $(".translate_quote[data-id=" + id_quote + "]").hide();
                $(".translate_quote[data-id=" + id_quote + "]").html(data);
                $(".translate_quote[data-id=" + id_quote + "]").fadeIn(1000)
            }
        });
        return false
    })
});
$(document).ready(function () {
    $("#social-networks").fadeIn(4000)
});
$(document).ready(function () {
    $(".fade_jquery").hover(function () {
        $(this).stop().animate({
            "opacity": "1"
        }, 1000)
    }, function () {
        $(this).stop().animate({
            "opacity": "0.5"
        }, 1000)
    })
});
(function (a) {
    a.uniform = {
        options: {
            selectClass: "selector",
            radioClass: "radio",
            checkboxClass: "checker",
            fileClass: "uploader",
            filenameClass: "filename",
            fileBtnClass: "action",
            fileDefaultText: "No file selected",
            fileBtnText: "Choose File",
            checkedClass: "checked",
            focusClass: "focus",
            disabledClass: "disabled",
            buttonClass: "button",
            activeClass: "active",
            hoverClass: "hover",
            useID: true,
            idPrefix: "uniform",
            resetSelector: false,
            autoHide: true
        },
        elements: []
    };
    if (a.browser.msie && a.browser.version < 7) {
        a.support.selectOpacity = false
    } else {
        a.support.selectOpacity = true
    }
    a.fn.uniform = function (k) {
        k = a.extend(a.uniform.options, k);
        var d = this;
        if (k.resetSelector != false) {
            a(k.resetSelector).mouseup(function () {
                function l() {
                    a.uniform.update(d)
                }
                setTimeout(l, 10)
            })
        }

        function j(l) {
            $el = a(l);
            $el.addClass($el.attr("type"));
            b(l)
        }

        function g(l) {
            a(l).addClass("uniform");
            b(l)
        }

        function i(o) {
            var m = a(o);
            var p = a("<div>"),
                l = a("<span>");
            p.addClass(k.buttonClass);
            if (k.useID && m.attr("id") != "") {
                p.attr("id", k.idPrefix + "-" + m.attr("id"))
            }
            var n;
            if (m.is("a") || m.is("button")) {
                n = m.text()
            } else {
                if (m.is(":submit") || m.is(":reset") || m.is("input[type=button]")) {
                    n = m.attr("value")
                }
            }
            n = n == "" ? m.is(":reset") ? "Reset" : "Submit" : n;
            l.html(n);
            m.css("opacity", 0);
            m.wrap(p);
            m.wrap(l);
            p = m.closest("div");
            l = m.closest("span");
            if (m.is(":disabled")) {
                p.addClass(k.disabledClass)
            }
            p.bind({
                "mouseenter.uniform": function () {
                    p.addClass(k.hoverClass)
                },
                    "mouseleave.uniform": function () {
                    p.removeClass(k.hoverClass);
                    p.removeClass(k.activeClass)
                },
                    "mousedown.uniform touchbegin.uniform": function () {
                    p.addClass(k.activeClass)
                },
                    "mouseup.uniform touchend.uniform": function () {
                    p.removeClass(k.activeClass)
                },
                    "click.uniform touchend.uniform": function (r) {
                    if (a(r.target).is("span") || a(r.target).is("div")) {
                        if (o[0].dispatchEvent) {
                            var q = document.createEvent("MouseEvents");
                            q.initEvent("click", true, true);
                            o[0].dispatchEvent(q)
                        } else {
                            o[0].click()
                        }
                    }
                }
            });
            o.bind({
                "focus.uniform": function () {
                    p.addClass(k.focusClass)
                },
                    "blur.uniform": function () {
                    p.removeClass(k.focusClass)
                }
            });
            a.uniform.noSelect(p);
            b(o)
        }

        function e(o) {
            var m = a(o);
            var p = a("<div />"),
                l = a("<span />");
            if (!m.css("display") == "none" && k.autoHide) {
                p.hide()
            }
            p.addClass(k.selectClass);
            if (k.useID && o.attr("id") != "") {
                p.attr("id", k.idPrefix + "-" + o.attr("id"))
            }
            var n = o.find(":selected:first");
            if (n.length == 0) {
                n = o.find("option:first")
            }
            l.html(n.html());
            o.css("opacity", 0);
            o.wrap(p);
            o.before(l);
            p = o.parent("div");
            l = o.siblings("span");
            o.bind({
                "change.uniform": function () {
                    l.text(o.find(":selected").html());
                    p.removeClass(k.activeClass)
                },
                    "focus.uniform": function () {
                    p.addClass(k.focusClass)
                },
                    "blur.uniform": function () {
                    p.removeClass(k.focusClass);
                    p.removeClass(k.activeClass)
                },
                    "mousedown.uniform touchbegin.uniform": function () {
                    p.addClass(k.activeClass)
                },
                    "mouseup.uniform touchend.uniform": function () {
                    p.removeClass(k.activeClass)
                },
                    "click.uniform touchend.uniform": function () {
                    p.removeClass(k.activeClass)
                },
                    "mouseenter.uniform": function () {
                    p.addClass(k.hoverClass)
                },
                    "mouseleave.uniform": function () {
                    p.removeClass(k.hoverClass);
                    p.removeClass(k.activeClass)
                },
                    "keyup.uniform": function () {
                    l.text(o.find(":selected").html())
                }
            });
            if (a(o).attr("disabled")) {
                p.addClass(k.disabledClass)
            }
            a.uniform.noSelect(l);
            b(o)
        }

        function f(n) {
            var m = a(n);
            var o = a("<div />"),
                l = a("<span />");
            if (!m.css("display") == "none" && k.autoHide) {
                o.hide()
            }
            o.addClass(k.checkboxClass);
            if (k.useID && n.attr("id") != "") {
                o.attr("id", k.idPrefix + "-" + n.attr("id"))
            }
            a(n).wrap(o);
            a(n).wrap(l);
            l = n.parent();
            o = l.parent();
            a(n).css("opacity", 0).bind({
                "focus.uniform": function () {
                    o.addClass(k.focusClass)
                },
                    "blur.uniform": function () {
                    o.removeClass(k.focusClass)
                },
                    "click.uniform touchend.uniform": function () {
                    if (!a(n).attr("checked")) {
                        l.removeClass(k.checkedClass)
                    } else {
                        l.addClass(k.checkedClass)
                    }
                },
                    "mousedown.uniform touchbegin.uniform": function () {
                    o.addClass(k.activeClass)
                },
                    "mouseup.uniform touchend.uniform": function () {
                    o.removeClass(k.activeClass)
                },
                    "mouseenter.uniform": function () {
                    o.addClass(k.hoverClass)
                },
                    "mouseleave.uniform": function () {
                    o.removeClass(k.hoverClass);
                    o.removeClass(k.activeClass)
                }
            });
            if (a(n).attr("checked")) {
                l.addClass(k.checkedClass)
            }
            if (a(n).attr("disabled")) {
                o.addClass(k.disabledClass)
            }
            b(n)
        }

        function c(n) {
            var m = a(n);
            var o = a("<div />"),
                l = a("<span />");
            if (!m.css("display") == "none" && k.autoHide) {
                o.hide()
            }
            o.addClass(k.radioClass);
            if (k.useID && n.attr("id") != "") {
                o.attr("id", k.idPrefix + "-" + n.attr("id"))
            }
            a(n).wrap(o);
            a(n).wrap(l);
            l = n.parent();
            o = l.parent();
            a(n).css("opacity", 0).bind({
                "focus.uniform": function () {
                    o.addClass(k.focusClass)
                },
                    "blur.uniform": function () {
                    o.removeClass(k.focusClass)
                },
                    "click.uniform touchend.uniform": function () {
                    if (!a(n).attr("checked")) {
                        l.removeClass(k.checkedClass)
                    } else {
                        var p = k.radioClass.split(" ")[0];
                        a("." + p + " span." + k.checkedClass + ":has([name='" + a(n).attr("name") + "'])").removeClass(k.checkedClass);
                        l.addClass(k.checkedClass)
                    }
                },
                    "mousedown.uniform touchend.uniform": function () {
                    if (!a(n).is(":disabled")) {
                        o.addClass(k.activeClass)
                    }
                },
                    "mouseup.uniform touchbegin.uniform": function () {
                    o.removeClass(k.activeClass)
                },
                    "mouseenter.uniform touchend.uniform": function () {
                    o.addClass(k.hoverClass)
                },
                    "mouseleave.uniform": function () {
                    o.removeClass(k.hoverClass);
                    o.removeClass(k.activeClass)
                }
            });
            if (a(n).attr("checked")) {
                l.addClass(k.checkedClass)
            }
            if (a(n).attr("disabled")) {
                o.addClass(k.disabledClass)
            }
            b(n)
        }

        function h(q) {
            var o = a(q);
            var r = a("<div />"),
                p = a("<span>" + k.fileDefaultText + "</span>"),
                m = a("<span>" + k.fileBtnText + "</span>");
            if (!o.css("display") == "none" && k.autoHide) {
                r.hide()
            }
            r.addClass(k.fileClass);
            p.addClass(k.filenameClass);
            m.addClass(k.fileBtnClass);
            if (k.useID && o.attr("id") != "") {
                r.attr("id", k.idPrefix + "-" + o.attr("id"))
            }
            o.wrap(r);
            o.after(m);
            o.after(p);
            r = o.closest("div");
            p = o.siblings("." + k.filenameClass);
            m = o.siblings("." + k.fileBtnClass);
            if (!o.attr("size")) {
                var l = r.width();
                o.attr("size", l / 10)
            }
            var n = function () {
                var s = o.val();
                if (s === "") {
                    s = k.fileDefaultText
                } else {
                    s = s.split(/[\/\\]+/);
                    s = s[(s.length - 1)]
                }
                p.text(s)
            };
            n();
            o.css("opacity", 0).bind({
                "focus.uniform": function () {
                    r.addClass(k.focusClass)
                },
                    "blur.uniform": function () {
                    r.removeClass(k.focusClass)
                },
                    "mousedown.uniform": function () {
                    if (!a(q).is(":disabled")) {
                        r.addClass(k.activeClass)
                    }
                },
                    "mouseup.uniform": function () {
                    r.removeClass(k.activeClass)
                },
                    "mouseenter.uniform": function () {
                    r.addClass(k.hoverClass)
                },
                    "mouseleave.uniform": function () {
                    r.removeClass(k.hoverClass);
                    r.removeClass(k.activeClass)
                }
            });
            if (a.browser.msie) {
                o.bind("click.uniform.ie7", function () {
                    setTimeout(n, 0)
                })
            } else {
                o.bind("change.uniform", n)
            }
            if (o.attr("disabled")) {
                r.addClass(k.disabledClass)
            }
            a.uniform.noSelect(p);
            a.uniform.noSelect(m);
            b(q)
        }
        a.uniform.restore = function (l) {
            if (l == undefined) {
                l = a(a.uniform.elements)
            }
            a(l).each(function () {
                if (a(this).is(":checkbox")) {
                    a(this).unwrap().unwrap()
                } else {
                    if (a(this).is("select")) {
                        a(this).siblings("span").remove();
                        a(this).unwrap()
                    } else {
                        if (a(this).is(":radio")) {
                            a(this).unwrap().unwrap()
                        } else {
                            if (a(this).is(":file")) {
                                a(this).siblings("span").remove();
                                a(this).unwrap()
                            } else {
                                if (a(this).is("button, :submit, :reset, a, input[type='button']")) {
                                    a(this).unwrap().unwrap()
                                }
                            }
                        }
                    }
                }
                a(this).unbind(".uniform");
                a(this).css("opacity", "1");
                var m = a.inArray(a(l), a.uniform.elements);
                a.uniform.elements.splice(m, 1)
            })
        };

        function b(l) {
            l = a(l).get();
            if (l.length > 1) {
                a.each(l, function (m, n) {
                    a.uniform.elements.push(n)
                })
            } else {
                a.uniform.elements.push(l)
            }
        }
        a.uniform.noSelect = function (l) {
            function m() {
                return false
            }
            a(l).each(function () {
                this.onselectstart = this.ondragstart = m;
                a(this).mousedown(m).css({
                    MozUserSelect: "none"
                })
            })
        };
        a.uniform.update = function (l) {
            if (l == undefined) {
                l = a(a.uniform.elements)
            }
            l = a(l);
            l.each(function () {
                var n = a(this);
                if (n.is("select")) {
                    var m = n.siblings("span");
                    var p = n.parent("div");
                    p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                    m.html(n.find(":selected").html());
                    if (n.is(":disabled")) {
                        p.addClass(k.disabledClass)
                    } else {
                        p.removeClass(k.disabledClass)
                    }
                } else {
                    if (n.is(":checkbox")) {
                        var m = n.closest("span");
                        var p = n.closest("div");
                        p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                        m.removeClass(k.checkedClass);
                        if (n.is(":checked")) {
                            m.addClass(k.checkedClass)
                        }
                        if (n.is(":disabled")) {
                            p.addClass(k.disabledClass)
                        } else {
                            p.removeClass(k.disabledClass)
                        }
                    } else {
                        if (n.is(":radio")) {
                            var m = n.closest("span");
                            var p = n.closest("div");
                            p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                            m.removeClass(k.checkedClass);
                            if (n.is(":checked")) {
                                m.addClass(k.checkedClass)
                            }
                            if (n.is(":disabled")) {
                                p.addClass(k.disabledClass)
                            } else {
                                p.removeClass(k.disabledClass)
                            }
                        } else {
                            if (n.is(":file")) {
                                var p = n.parent("div");
                                var o = n.siblings(k.filenameClass);
                                btnTag = n.siblings(k.fileBtnClass);
                                p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                                o.text(n.val());
                                if (n.is(":disabled")) {
                                    p.addClass(k.disabledClass)
                                } else {
                                    p.removeClass(k.disabledClass)
                                }
                            } else {
                                if (n.is(":submit") || n.is(":reset") || n.is("button") || n.is("a") || l.is("input[type=button]")) {
                                    var p = n.closest("div");
                                    p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                                    if (n.is(":disabled")) {
                                        p.addClass(k.disabledClass)
                                    } else {
                                        p.removeClass(k.disabledClass)
                                    }
                                }
                            }
                        }
                    }
                }
            })
        };
        return this.each(function () {
            if (a.support.selectOpacity) {
                var l = a(this);
                if (l.is("select")) {
                    if (l.attr("multiple") != true) {
                        if (l.attr("size") == undefined || l.attr("size") <= 1) {
                            e(l)
                        }
                    }
                } else {
                    if (l.is(":checkbox")) {
                        f(l)
                    } else {
                        if (l.is(":radio")) {
                            c(l)
                        } else {
                            if (l.is(":file")) {
                                h(l)
                            } else {
                                if (l.is(":text, :password, input[type='email']")) {
                                    j(l)
                                } else {
                                    if (l.is("textarea")) {
                                        g(l)
                                    } else {
                                        if (l.is("a") || l.is(":submit") || l.is(":reset") || l.is("button") || l.is("input[type=button]")) {
                                            i(l)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
})(jQuery);
$(function () {
    $("input, textarea, select, button").uniform()
});
$(document).ready(function (e) {
    $('#compteur_textarea').css("display", "none");
    $('#texte_quote').keyup(function () {
        var nombreCaractere = $(this).val().length;
        if (nombreCaractere == 1) {
            var msg = '' + nombreCaractere + ' character'
        } else {
            var msg = '' + nombreCaractere + ' characters'
        }
        $('#compteur_textarea').text(msg);
        if (nombreCaractere >= 50) {
            $('#compteur_textarea').addClass("green");
            $('#compteur_textarea').removeClass("red")
        } else {
            $('#compteur_textarea').addClass("red");
            $('#compteur_textarea').removeClass("green")
        }
        if ($('#compteur_textarea').is(":visible") && nombreCaractere == 0) {
            $('#compteur_textarea').fadeOut("slow")
        }
        if ($('#compteur_textarea').is(":hidden") && nombreCaractere >= 1) {
            $('#compteur_textarea').fadeIn("slow")
        }
    })
});