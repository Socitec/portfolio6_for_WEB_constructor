$(function(){

  //ハンバーガーメニューボタン
  $('.burgerButton').on('click',function(){
    $('.burgerButton').toggleClass('close');
    $('.navWrapper').toggleClass('slide-in');
  });

  $('.navWrapper a').on('click',function(){
    $('.navWrapper').removeClass('slide-in');
    $('.burgerButton').toggleClass('close');
  });

  //メニュースクロール時隠す、出現
  var startPos = 0, winScrollTop = 0;
  // scrollイベントを設定
  window.addEventListener('scroll', function () {
    winScrollTop = this.scrollY;
    if (winScrollTop >= startPos) {
      // 下にスクロールされた時
      if (winScrollTop >= 200) {
        // 下に200pxスクロールされたら隠す
        document.getElementById('scrollArea').classList.add('hide');
      }
    } else {
      // 上にスクロールされた時
      document.getElementById('scrollArea').classList.remove('hide');
    }
    startPos = winScrollTop;
  });


  //ページ内リンククリック時移動アニメーション
  //goSectionクラスがクリックされると関数が実行される
  $(".goSection").on("click", function() {

    // クリックされた要素のhref属性の値を取得
    const scrollTarget = $(this).attr("href");
    // 取得した値のid属性がついた要素の位置を取得
    const offsetTop = $(scrollTarget).offset().top;

    // 取得した箇所に移動
    $("html, body").animate({ scrollTop: offsetTop }, 200, 'swing');

    return false;
  });

  //トップボタンスクロールで出現、トップに移動で消滅
  var topBtn = $('#pageTop');
  topBtn.hide();
  //スクロールが100に達したらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  //スクロールしてトップ
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

  // スクロールすると要素がフェードイン
  //はじめにフェードインの対象要素をopacity0で隠しておく
  //jQueryでCSSしとくのは、ユーザーによってセキュリティ対策のためにjavascriptをoffにしており、jQueryが働かなくても見えるようにするため
  $(".effectFadeIn").css({'opacity':'0', 'top':'100px'});
  // スクロールごとに処理をさせる
  $(window).on('scroll',function(){
    // スクロール量を取得
    var scroll_top = $(window).scrollTop();
    // eachを利用して「effect」クラスの要素それぞれに処理を行なう
    $('.effectFadeIn').each(function(){
      // 要素のドキュメント上の位置を取得
      var offset_top = $(this).offset().top,
      top_margin = $(window).height(); // ウィンドウサイズ
      // スクロール量と要素の位置からマージンを引いた値を比較
      if( scroll_top > offset_top - top_margin + 0.2 * top_margin ){
        // スクロール量が所定の位置を越えた時に1秒かけて現れる
        $(this).animate({ 'opacity': '1.0', 'top':'0' }, { duration: 1000, easing: 'swing'});
      }
    });
  });


  //コンタクトフォーム確認
  //エラーを表示する関数（error クラスの p 要素を追加して表示）
  function show_error(message, this$) {
    text = this$.parent().find('label').text() + message;
    this$.parent().append("<p class='error'>" + text + "</p>");
  }

  //フォームが送信される際のイベントハンドラの設定
  $("#main_contact").submit(function(){
    //エラー表示の初期化
    $("p.error").remove();
    $("div").removeClass("error");
    var text = "";
    $("#errorDispaly").remove();

    //メールアドレスの検証
    var email =  $.trim($("#email").val());
    if(email && !(/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/gi).test(email)){
      $("#email").after("<p class='error'>メールアドレスの形式が異なります</p>");
    }
    //確認用メールアドレスの検証
    var email_check =  $.trim($("#email_check").val());
    if(email_check && email_check != $.trim($("input[name="+$("#email_check").attr("name").replace(/^(.+)_check$/, "$1")+"]").val())){
      show_error("が異なります", $("#email_check"));
    }
    //電話番号の検証
    var tel = $.trim($("#tel").val());
    if(tel && !(/^\(?\d{2,5}\)?[-(\.\s]{0,2}\d{1,4}[-)\.\s]{0,2}\d{3,4}$/gi).test(tel)){
      $("#tel").after("<p class='error'>電話番号の形式が異なります（半角英数字でご入力ください）</p>");
    }

    //1行テキスト入力フォームとテキストエリアの検証
    $(":text,textarea").filter(".validate").each(function(){
      //必須項目の検証
      $(this).filter(".required").each(function(){
        if($(this).val()==""){
          show_error(" は必須項目です", $(this));
        }
      });
      //文字数の検証
      $(this).filter(".max30").each(function(){
        if($(this).val().length > 30){
          show_error(" は30文字以内です", $(this));
        }
      });
      $(this).filter(".max50").each(function(){
        if($(this).val().length > 50){
          show_error(" は50文字以内です", $(this));
        }
      });
      $(this).filter(".max100").each(function(){
        if($(this).val().length > 100){
          show_error(" は100文字以内です", $(this));
        }
      });
      //文字数の検証
      $(this).filter(".max1000").each(function(){
        if($(this).val().length > 1000){
          show_error(" は1000文字以内でお願いします", $(this));
        }
      });
    });

    //error クラスの追加の処理
    if($("p.error").length > 0){
      $("p.error").parent().addClass("error");
      $('html,body').animate({ scrollTop: $("p.error:first").offset().top-180 }, 'slow');
      return false;
    }
  });

  //テキストエリアに入力された文字数を表示
  $("textarea").on('keydown keyup change', function() {
    var count = $(this).val().length;
    $("#count").text(count);
    if(count > 1000) {
      $("#count").css({color: 'red', fontWeight: 'bold'});
    }else{
      $("#count").css({color: '#333', fontWeight: 'normal'});
    }
  });


});
