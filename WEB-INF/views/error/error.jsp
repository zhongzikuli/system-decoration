<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/outer_css.jsp"%>
<head><title>404 Not Found</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style type="text/css">

        A:link {
            COLOR: #007ab7;
            TEXT-DECORATION: none
        }

        A:visited {
            COLOR: #007ab7;
            TEXT-DECORATION: none
        }

        H1 {
            Z-INDEX: 2;
            POSITION: relative;
            PADDING-BOTTOM: 0px;
            MARGIN: 110px auto 15px 400px;
            PADDING-LEFT: 0px;
            WIDTH: 640px;
            PADDING-RIGHT: 0px;
            BACKGROUND: url(../img/title.png) no-repeat;
            HEIGHT: 0px;
            OVERFLOW: hidden;
            PADDING-TOP: 230px;
            xxxxborder: 1px solid
        }

        .link A {
            MARGIN-RIGHT: 1em
        }

        .link {
            MARGIN: 0px auto 15px 0;
            COLOR: #505050
        }

        .texts {
            MARGIN: 0px 30px 15px 0px;
            COLOR: #505050
        }

        .texts {
            LINE-HEIGHT: 2
        }

        .texts DD {
            PADDING-BOTTOM: 0px;
            MARGIN: 0px;
            PADDING-LEFT: 15px;
            PADDING-RIGHT: 0px;
            PADDING-TOP: 0px
        }

        .texts UL {
            PADDING-BOTTOM: 0px;
            MARGIN: 0px;
            PADDING-LEFT: 0px;
            PADDING-RIGHT: 0px;
            PADDING-TOP: 0px
        }

        .portal {
            TEXT-ALIGN: center;
            WHITE-SPACE: nowrap;
            COLOR: #505050;
            WORD-SPACING: 0.45em
        }

        .portal A:link {
            COLOR: #505050;
            WORD-SPACING: 0px
        }

        .portal A:visited {
            COLOR: #505050;
            WORD-SPACING: 0px
        }

        .portal A:hover {
            COLOR: #007ab7
        }

        .portal A:active {
            COLOR: #007ab7
        }

        .portal SPAN {
            LINE-HEIGHT: 35px;
            DISPLAY: inline-block;
            BACKGROUND: url(/resources/img/portal.png) repeat-x;
            HEIGHT: 38px
        }

        .portal SPAN SPAN {
            PADDING-BOTTOM: 0px;
            PADDING-LEFT: 20px;
            PADDING-RIGHT: 0px;
            BACKGROUND: url(/resources/img/portal.png) no-repeat 0px -40px;
            PADDING-TOP: 0px
        }

        .portal SPAN SPAN SPAN {
            PADDING-BOTTOM: 0px;
            PADDING-LEFT: 0px;
            PADDING-RIGHT: 20px;
            BACKGROUND-POSITION: 100% -80px;
            PADDING-TOP: 0px
        }

        font {
            word-wrap: break-word;
        }
    </style>
    <!--[if lte IE 8]>
    <STYLE type=text/css>H2 EM {
        COLOR: #e4ebf8
    }
    </STYLE>
    <![endif]-->
    <meta name="GENERATOR" content="MSHTML 8.00.7601.17514">
</head>
<body>
    <div class="mod_header">
        <div class="content">
            <div class="group">
                <p class="link"><a href="#">返回首页</a> <a href="javascript:history.go(-1);">返回上一页</a></p>
            </div>
        </div>
    </div>
    
    <div class="mod_basic">
        <div class="content">
            <div class="sub_content">
                <dl class="texts">
                    <dt>系统错误, 经砖家仔细研究结果如下:</dt>
                    <dd>
                        <ul>
                            <li><span color="red">${message}</span></li>
                        </ul>
                    </dd>
                </dl>
                <div id="navc" sizcache="1" sizset="0">
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</body>
