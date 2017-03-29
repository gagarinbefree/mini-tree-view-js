# mini-tree-view-js
<b>Minimalistic javascript tree view</b>
<p>Get started:</p>

&bull; JavaScript

```javascript
window.onload = function () {
        var data = [
                {
                        name: "1 Level 1 Leaf 1",
                        childs: [
                                {
                                        name: "4 Level 2 Leaf 1",                        
                                },
                                {
                                        name: "5 Level 2 Leaf 2"
                                }
                        ]
                },
                {
                        name: "3 Level 1 Leaf 3"
                }
        ];

        var tree = new minitree(data, {
                container: document.getElementById('container'),
                clickHandler: function (e) {
                        var target = (typeof (e.target) !== 'undefined') ? e.target : e.srcElement;
                        var isLeaf = this.isLeaf(target);
                }
        });
}
```



