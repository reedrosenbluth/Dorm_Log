$(document).ready(function() {
	$('textarea').autosize();

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

           // var $form = $('.entry-form.photo-form');

           // var data = $form.serialize();

           //  $.ajax({
           //      url: "entries/new/",
           //      method: 'get',
           //      data: data
           //  }).done(function() {
           //      $(this).addClass("done");
           //  });
});

