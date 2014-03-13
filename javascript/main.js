(function(root){

	var WT = root.WT = ( root.WT || {} );

	var View = WT.View = function (el) {
		this.$el = el;
	};

	View.prototype.render = function(data){
		var that = this;

		for (var i = 0; i < data.topics.length; i++){
			this.$el.append('<ul data-title-id =' + i + "><li class='title'>" + data.topics[i].topictitle)
			for (var j = 0; j < data.topics[i].responses.length; j++){
				var response = data.topics[i].responses[j]
				if (response.parentid == 0) {
					$('ul[data-title-id=' + i + ']')
					.append('<li data-post-id=' + response.id + '>' + response.posttext)
				} else if (response.parentid > 0) {
					$('li[data-post-id=' + response.parentid + ']')
					.append('<ul><li data-post-id=' + response.id + '>' + response.posttext)
				}
			}
		}
	};

	View.prototype.initialize = function(){
		var that = this;
		$.ajax({
			url: 'discussion.json',
			dataType: 'json',
			success: function(data){
				that.render(data)
			}
		})
	};
})(this);

