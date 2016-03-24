(function(){

	$("a[href='#']").click(function(e) {
		e.preventDefault();
	});

	var $button = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>").click(function(){
		var html = $(this).parent().html();
		html = cleanSource(html);
		$("#source-modal pre code").text(html);
		// format code and hightlighter
		Prism.highlightElement($("#source-modal pre code")[0]);
		$("#source-modal").modal();
	});
	$('.bs-component [data-toggle="popover"]').popover();
	$('.bs-component [data-toggle="tooltip"]').tooltip();
	$(".bs-component").hover(function(){
		$(this).append($button);
		$button.show();
	}, function(){
		$button.hide();
	});

	function cleanSource(html) {
		html = html.replace(/×/g, "&close;")
		.replace(/«/g, "&laquo;")
		.replace(/»/g, "&raquo;")
		.replace(/←/g, "&larr;")
		.replace(/→/g, "&rarr;");
		var lines = html.split(/\n/);
		lines.shift();
		lines.splice(-1, 1);
		var tabsChar = lines[0].substring(0,1),
		reCount = new RegExp("[^" + tabsChar + "]"),
		indentSize = lines[0].split(reCount)[0].length,
		re = new RegExp(tabsChar + "{" + indentSize + "}");
		lines = lines.map(function(line){
			if (line.match(re)) {
				line = line.substring(indentSize);
			}
			return line;
		});
		lines = lines.join("\n");
		return lines;
	}

})();
