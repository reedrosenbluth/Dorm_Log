$(function() {
	$(".submit-annot").on("click", function(e){
		e.preventDefault();
		var $parent = $(this).parent();
		var $annot = $parent.find('input').val();
		var $entry = $parent.data('entry');

		if ($annot == "") {
			alert("Please Enter a Note");
		} else if (user_id == 0) {
			alert("Please Log In!");
		} else {
			var data = {
				"text": $annot,
				"entry": $entry
			};
			$.ajax({
				url: "/ws/add_comment/",
				type: "POST",
				data: data,
				success: function(data) {
					$parent.before('<div class="panel panel-default"><div class="panel-body">' + $annot + ' <a href="#"><i>–' + data + '</i></a></div></div>');
				}
			});
		}
		
		
	});

	$(".like-body").ready(function(e) {
		
		var $likebodys = $(this).find('.like-body');

		$likebodys.each(addGlyphs)

	});
	function addGlyphs(index, Element) {
		$likebody = $(this);
		var $likebutton = $likebody.parent().find('.submit-fav');
		console.log($likebody.children());
		if ($likebody.children().size() > 0) {
			$likebody.show()

			if ($likebody.children($likebutton.parent().data('initials')) != null)
				$likebutton.children('.glyphicon').addClass('glyphicon-heart');
			else
				$likebutton.children('.glyphicon').addClass('glyphicon-heart-empty');
		} else
			$likebutton.children('.glyphicon').addClass('glyphicon-heart-empty');
	}
	$(".submit-fav").on("click", function(e){
		e.preventDefault();
		var $parent = $(this).parent();
		var $entry = $parent.data('entry');
		var $auth = $parent.data('initials');
		
		var data = {
	
			"entry": $entry
		};
		$.ajax({
			url: "/ws/add_favorite",
			type: "POST",
			data: data,
			success: function(data) {
				
				if (data == 'success') {
					$parent.parent().parent().children('.panel-body').append('<p class='+$auth+'>'+$auth+'</p>');
					$parent.parent().parent().children('.panel-body').show();
					$parent.find('.glyphicon').removeClass('glyphicon-heart-empty').addClass('glyphicon-heart');
					


				}
				else  {
					$parent.parent().parent().children('.panel-body').children().remove('.'+$auth);
					$parent.find('.glyphicon').removeClass('glyphicon-heart').addClass('glyphicon-heart-empty');
					if ($parent.parent().parent().children('.panel-body').children().size() == 0)
						$parent.parent().parent().children('.panel-body').hide();	
				}
			}
		});
		
		
		
	});


	$(".add-new-entry").on("click", function(e){
		var $this = $(this);
		$this.closest(".add-entry").next().slideToggle(200);
		if ($this.text() == "Cancel") {
			$this.html('<span class="glyphicon glyphicon-plus"></span> Add new post');
		} else {
			$this.text("Cancel");
		}
	});


	$(".annotations").each(function() {
		$(this).css('max-height', $(this).closest('.row').find('.post').height());
	});
});