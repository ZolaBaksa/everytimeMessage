<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>

<!DOCTYPE html>
<html lang="ko">
<head>
  <title>에브리타임</title>
  <meta charset="utf-8">
  <meta name="referrer" content="origin">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta property="fb:app_id" content="258676027581965">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://everytime.kr/images/og_image.png">
  <meta property="og:url" content="https://everytime.kr/message/31475425">
  <meta property="og:site_name" content="에브리타임">
  <meta property="og:title" content="에브리타임">
  <meta property="og:description" content="전국 400개 대학을 지원하는 대학교 커뮤니티 및 시간표 서비스. 시간표 작성 및 학업 관리, 학교 생활 정보, 학교별 익명 커뮤니티 기능을 제공합니다.">
  <meta name="description" content="전국 400개 대학을 지원하는 대학교 커뮤니티 및 시간표 서비스. 시간표 작성 및 학업 관리, 학교 생활 정보, 학교별 익명 커뮤니티 기능을 제공합니다.">
  <meta name="keywords" content="에브리타임, 에타, everytime, 시간표, 수강신청, 강의평가, 학점계산기, 학식, 오늘의학식, 책방, 중고책, 대학생, 대학교, 대학, 대학생 시간표, 대학교 시간표, 대학생 커뮤니티, 대학교 커뮤니티, 시간표 앱, 시간표 어플">
  <meta name="naver-site-verification" content="7366738375e320e44bd1c743b364db13086a7b0e">
  <meta name="robots" content="noindex">
  <link type="text/css" href="/css/common.css" rel="stylesheet">
  <link type="text/css" href="/css/common.partial.css" rel="stylesheet">
  <link type="text/css" href="/css/container.message.css" rel="stylesheet">
  <link type="text/css" href="/css/container.modal.css" rel="stylesheet">
  <link href="/favicon.ico" rel="shortcut icon">
  <!--[if lt IE 9]>
  <script src="/js/extensions.html5shiv.js"></script>
  <script src="/js/extensions.respond.min.js"></script>
  <script src="/js/extensions.excanvas.min.js"></script>
  <![endif]-->
  <!--[if lt IE 8]>
  <script src="/js/extensions.json3.min.js"></script>
  <![endif]-->
  <script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
  <script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
  <script type="text/javascript" src="/js/common.js"></script>
  <script type="text/javascript" src="/js/message.index.js"></script>
  <script type="text/javascript" src="/js/message.send.js"></script>
</head>
<body>
<nav>
    <div class="wrap">
      <div id="logo">
        <a href="/"><img src="/images/new/nav.logo.png"></a>
        <p><span class="name multiple">에브리타임</span><span class="subname">동의대</span></p>
      </div>
      <div id="account">
        <a href="/message" title="쪽지함" class="icon message">쪽지함</a></li>
        <a href="/my" title="내 정보" class="icon my">내 정보</a>
        <input type="hidden" id="userUserid" value="skjin20800">
        <input type="hidden" id="userSchool" value="151">
        <input type="hidden" id="userCampus" value="183">
      </div>
      <ul id="menu">
        <li><a href="/">게시판</a></li>
        <li><a href="/timetable">시간표</a></li>
        <li><a href="/lecture">강의평가</a></li>
        <li><a href="/calculator">학점계산기</a></li>
        <li><a href="/friend">친구</a></li>
        <li><a href="https://bookstore.everytime.kr/">책방</a></li>
        <li><a href="https://www.campuspick.com/">캠퍼스픽</a></li>
      </ul>
    </div>
  </nav>
<div id="container" class="message" data-box-id="31475425">
    <aside class="none">
      <div class="title">
        <a class="hamburger"></a>
        <h1>쪽지함</h1>
      </div>
    </aside>
    <div class="messageboxes visible">
      <h2>쪽지함</h2>
      <div class="items">
        <div class="loading"></div>
      </div>
    </div>
    <div class="messages"></div>
    <form id="messageSend" class="modal">
      <a title="닫기" class="close"></a>
      <h3>쪽지 보내기</h3>
      <p>
        <textarea name="message" class="text" placeholder="내용을 입력해주세요."></textarea>
      </p>
      <input type="submit" value="전송" class="button">
    </form>
    <form id="messageMore" class="modal">
      <a title="닫기" class="close"></a>
      <h3>쪽지함</h3>
      <ul>
        <li><a data-menu="removeAll">전체 삭제</a></li>
        <li><a data-menu="block">차단</a></li>
        <li><a data-menu="reportSpam">스팸 신고</a></li>
      </ul>
    </form>
  </div>
<div id="bottom">
    <ul class="links">
      <li><a href="/page/serviceagreement">이용약관</a></li>
      <li><a href="/page/privacy">개인정보처리방침</a></li>
      <li><a href="/page/rules">커뮤니티이용규칙</a></li>
      <li><a href="/notice">공지사항</a></li>
      <li><a href="/page/faq">문의하기</a></li>
      <li class="copyright"><a href="/">&copy; 에브리타임</a></li>
    </ul>
  </div>
  <script type="text/javascript">
    var _serverTime = 1616995570510;
    var _clientTime = new Date().getTime();
    var _diffTime = _clientTime - _serverTime;
    var _apiServerUrl = 'https://api.everytime.kr';
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-22022140-4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-22022140-4');
  </script>
</body>
</html>