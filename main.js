Vue.component('alert', {
	template: '<button @click="on_click">btn</button>',
	methods: {
		on_click: function () {
			alert(this.outMsg)
		}
	},
	props: {
		outMsg: {}
	}
})

Vue.component('bookmarks', {
	data() {
		return {
			bookmarks: {}
		}
	},
	props: {
		// bookmarks: {}
	},
	template:
		`
		<div>
			<ul>
				<li v-for="(e, folderIndex) in bookmarks">
					{{e.title}}
					<ul>
						<li v-for="(b, bIndex) in e.bookmarks">
							<a :href="b.url" target="_blank">{{b.name}}</a>
						</li>
						<li><input type="button" @click="addBookmark(folderIndex)" value="add marks"/></li>
					</ul>
				</li>
				<li><input type="button" @click="addFolder()" value="add folder"/></li>
				
			</ul>
		</div>
		`,
	created: function () {
		this.getBookMarks()
	},
	watch: {
		bookmarks: {
			handler() {
				this.save()
			},
			deep: true
		}
	},
	methods: {
		save: function () {
			console.log('write')
		},
		addBookmark: function (folderIndex) {
			let obj = {}
			obj.name = '1111111'
			obj.url = 'http://www.baidu.com?wd=1'
			this.bookmarks[folderIndex].bookmarks.push(obj)
		},
		addFolder: function () {
			let obj = {}
			obj.title = 'new folder'
			obj.bookmarks = []
			this.bookmarks.push(obj)

		},
		getBookMarks: function () {
			const self = this
			$.ajax({
				type: 'GET',
				url: 'http://127.0.0.1:5500/bookmarkSync/JSON/JsonBookmarks.json',
				dataType: 'json',
				async: false,
				success: function (data) {
					self.bookmarks = data
				}
			})
		}
	}
})

new Vue({
	el: '#app',
	data() {
		return {
		}
	}
});