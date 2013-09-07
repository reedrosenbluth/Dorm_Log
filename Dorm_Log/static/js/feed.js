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
		console.log("favorite");
		
		var data = {
	
			"entry": $entry
		};
		$.ajax({
			url: "ws/add_favorite",
			type: "POST",
			data: data,
			success: function(data) {
				console.log("success")
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