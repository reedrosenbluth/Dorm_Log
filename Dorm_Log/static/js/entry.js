$(document).ready(function() {
	$('textarea').autosize();

  $('textarea').on('focusin', function() {
      $('.submit-footer').slideToggle(200);
  }).on('focusout', function() {
      $('.submit-footer').slideToggle(200);
  });

  function count(){
      var txtVal = $('textarea').val();
      var words = txtVal.trim().replace(/\s+/gi, ' ').split(' ').length;
      var chars = txtVal.length;
      if(chars===0){words=0;}
      $(".wordcount").html(chars);
  }
  count();

  $('textarea').on('keyup propertychange paste', function(){ 
    count();
  });

	$('.type-button').click(function () {
		var $that = $(this);
		$that.parent().children().removeClass('selected');
		$that.addClass('selected');

    var id = $that.attr('id');
    var form_id = id.replace('button','form');

    var $form = $('#' + form_id);
    $('.entry-form').addClass('hidden');
    $form.removeClass('hidden');
	});

  $(".submit-btn").on("click", function(){
     var $form = $('#photo-form');

     var data = $form.serialize();

      $.ajax({
          url: "/entries/new/",
          method: 'get',
          data: data
      }).done(function() {
          $(this).addClass("done");
      });
  })
});

