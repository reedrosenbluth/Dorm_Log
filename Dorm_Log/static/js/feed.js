$(function() {
	$(".submit-annot").on("click", function(e){
		e.preventDefault();
		var $parent = $(this).parent()
		var $annot = $parent.find('input').val();
		var $entry = $parent.data('entry');
		if ($annot == "") {
			alert("Please Enter a Note");
		} else {
			var data = {
				"text": $annot,
				"entry": $entry
			};
			$.ajax({
				url: "ws/add_comment",
				type: "POST",
				data: data,
				success: function(data) {
					$parent.before('<div class="panel panel-default"><div class="panel-body">' + $annot + ' <a href="#"><i>–' + data + '</i></a></div></div>');
				}
			});
		}
	});
});