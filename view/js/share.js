

var share = {
  init: function() {
    share.queryData();
    share.listen();
    share.erCode()
    $("#copytxt").html(window.location.href);
  },
  listen: function() {
    $(document).on("click", ".mask-wrap", function() {
      $(".mask-wrap").hide();
      $("#qrcode").hide();
    });
    $(document).on("click", "#shareBtn", function() {
      $(".mask-wrap").show();
      $("#qrcode").show();
    });
    $(document).on("click", "#qrcode", function() {
      return false;
    });
    $(document).on("click", "#copy", function() {
      var Url2 = document.getElementById("copytxt").innerText;
      var oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      $("#mask_copy").show();
      $("#maskInnerCopy").animate({ opacity: 1, top: "50%" }, 500);
    });

    $(document).on("click", ".close6", function() {
      $(".mask-wrap").hide();
      $(".qrcode").hide();
    });

    $(document).on("click", "#maskCopyYes", function() {
      $("#maskInnerCopy").animate(
        { opacity: 0, top: 0, transform: "translateZ(300deg)" },
        500,
        function() {
          $("#mask_copy").hide();
          setTimeout(function() {
            $(".mask-wrap").hide();
            $("#qrcode").hide();
          }, 3000);
        }
      );
    });
  },
  queryData: function() {
    $.ajax({
      url: header + "/dfbinterface/mobile/handle/GetSingleHandle", //后台接口地址
      type: "POST",
      dataType: "json",
      data: { disasterid: getRequest().uuid },
      success: function(data) {
        console.log(data);
        if (data.success == "0") {
          htmlL(data.result);
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  htmlL: function(data) {
    $("#ids").html("编号（" + data.handle.id + "）");
    //   $("#address").html(data.fzsite.addressname);
    //   $("#liShu").html(data.fzsite.areaname);
    //   $("#time").html(data.fzsite.checkdate);
  },
  erCode:function(){
    $("#downloadApp").qrcode({
      text: "http://a3.rabbitpre.com/m2/aUe1ZjN35c?&lc=1&sui=TmugHNBC#from=share"
    });
    $("#PublicNumber").qrcode({
      text: "http://a3.rabbitpre.com/m2/aUe1ZjN35c?&lc=1&sui=TmugHNBC#from=share"
    });
  }
};
share.init();
