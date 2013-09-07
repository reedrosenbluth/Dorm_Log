$(function() {
	$(".submit-annot").on("click", function(e){
		e.preventDefault();
		var $parent = $(this).parent();
		var $annot = $parent.find('input').val();
		var $entry = $parent.data('entry');
		console.log("favorite");
		if ($annot == "") {
			alert("Please Enter a Note");
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


	$(".submit-fav").on("click", function(e){
		e.preventDefault();
		var $parent = $(this).parent();
		var $entry = $parent.data('entry');
		var $auth = $parent.data('initials');
		console.log($auth)
		var data = {
	
			"entry": $entry
		};
		$.ajax({
			url: "/ws/add_favorite",
			type: "POST",
			data: data,
			success: function(data) {
				console.log(data)
				console.log($parent.parent().parent().children('.panel-body'))
				if (data == 'success')
					$parent.parent().parent().children('.panel-body').append('<p class='+$auth+'>'+$auth+'</p>')
				else
					$parent.parent().parent().children('.panel-body').children().remove('.'+$auth)
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

});