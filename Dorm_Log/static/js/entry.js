$(document).ready(function() {
	// $('textarea').autosize();

	$('.type-button').click(function () {
		var $that = $(this);

		$that.parent().children().removeClass('selected');

		$that.addClass('selected');
	});

	$('textarea').keydown(function(e) {
	     if(e.keyCode == 13) {
	       e.preventDefault(); // Makes no difference
	   }
	});

    $('textarea').keyup(function(e) {
         if(e.keyCode == 13) {
           var $form = $('.entry-form.photo-form');

           var data = $form.serialize();

            $.ajax({
                url: "entries/new/",
                method: 'get',
                data: data
            }).done(function() {
                $(this).addClass("done");
            });
       }
    });
});

