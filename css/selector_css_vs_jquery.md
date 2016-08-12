# CSS与JQuery的选择器对比

<table>
	<thead>
		<tr><td>选择器 </td><td> 含义 </td><td> CSS版本 </td><td> jQuery </td><td> IE版本</td></tr>
	</thead>
	<tbody>
		<tr><td>* </td><td> 所有元素 </td><td> 2 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>A </td><td> 标签名为`A`的所有元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>#A </td><td> `id`属性为`A`的一个元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>.A </td><td> `class`属性中含有`A`的所有元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>A,B </td><td> 符合`A或B`条件的所有元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>.A.B </td><td> `class`属性中`同时`含有`A及B`的所有元素 </td><td> 1 </td><td> √ </td><td> 7+</td></tr>
		<tr><td>A B </td><td> `A`任意级`后代`中的所有`B`元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>A > B </td><td> `A`第`一代子级`中所有`B`元素 </td><td> 2 </td><td> √ </td><td> 7+</td></tr>
		<tr><td>A + B </td><td> `A`后`紧邻`的一个`B`元素 </td><td> 2 </td><td> √ </td><td> 7+</td></tr>
		<tr><td>A ~ B </td><td> `A`后`同级`的所有`B`元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A] </td><td> 含有`属性`名为`A`的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A="B"] </td><td> 属性`A`的值为`B`的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A|="B"] </td><td> 属性`A`中包含独立的单词`B`的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A~="B"] </td><td> 属性`A`中包含以`B`开头的单词的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A*="B"] </td><td> 属性`A`中包含`B`的所有元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A$="B"] </td><td> 属性`A`以`B`开头的所有元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A^="B"] </td><td> 属性`A`以`B`结尾的所有元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A!="B"] </td><td> 属性`A`不等于`B`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:checked </td><td> 所有`被选中`的单/复选框 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:disabled </td><td> 所有`被禁用`的表单组件 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:empty </td><td> `无子元素`（伪元素不算）的所有空元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:parent </td><td> `有子元素`（伪元素不算）的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:enabled </td><td> 所有`可用`的表单组件 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:focus </td><td> `获得焦点`的表单组件 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:selected </td><td> `被选中`的所有option元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:root </td><td> 文档根元素（即html元素） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:target </td><td> 当前URL中`#`所对应的元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:first-child </td><td> 是其父元素的`第一子元素`的所有元素 </td><td> 2 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:first-of-type </td><td> 是`同标签名的同代元素`中`<br>第一次出现`的所有元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:last-child </td><td> 是其父元素的`最后子元素`的所有元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:last-of-type </td><td> 是`同标签名的同代元素`中`<br>最后一次出现`的所有元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:nth-child(n) </td><td> 在父元素中是第`n`个子元素<br>的所有元素（可以使用公式`an+b`） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:nth-last-child(n) </td><td> 在父元素中是`倒数`第`n`个<br>子元素的所有元素（可以使用公式`an+b`） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:nth-of-type(n) </td><td> 是`同标签名的同代元素`中<br>第`n`个出现的所有元素（可以使用公式`an+b`） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:nth-last-of-type(n) </td><td> 是`同标签名的同代元素`中`<br>倒数`第`n`个出现的所有元素（可以使用公式`an+b`） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:first </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:last </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:eq(x) </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:gt(x) </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:lt(x) </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:even </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:odd </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>__注意__ </td><td colspan="4"> 使用`nth`系列可能不会得到预期的效果，尤其是在`nth`前边有其它选择器时 </td></tr>
		<tr><td>:only-child </td><td> 是其父元素中`唯一子元素`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:only-of-type </td><td> 是其父元素中`唯一标签子元素`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:button </td><td> `butotn`标签及`input[type="button"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:checkbox </td><td> `input[type="checkbox"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:file </td><td> `input[type="file"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:image </td><td> `input[type="image"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:input </td><td> `input[type="input"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:password </td><td> `input[type="password"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:radio </td><td> `input[type="radio"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:reset </td><td> `input[type="reset"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:submit </td><td> `input[type="submit"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:text </td><td> `input[type="text"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:contains(A) </td><td> `文本内容`中包含`A`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:has(A) </td><td> `后代元素`中包含`A`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:header </td><td> 所有`h1`到`h6`元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:hidden </td><td> 所有`不可见`元素，包括`display:none`及`input[type="hidden"]` </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:visible </td><td> 所有`可见`元素，包括`visibility:hidden`及正常可见元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:link </td><td> 有`href`的所有`a`元素 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:visited </td><td> 历史记录中（被访问过的）的所有`a`元素 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:hover </td><td> 鼠标指向的元素（在IE6中只有`a`标签可以使用这个伪类） </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:active </td><td> 鼠标按下时所指向的元素（在IE6中只有`a`标签可以使用这个伪类） </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td>__注意__ </td><td colspan="4"> 在CSS中必须以`:link`-`:visited`-`:hover`-`:active`的顺序写才能保证所有这4个样式都有效 </td></tr>
		<tr><td>:before </td><td> 伪元素，在元素内容前边加内容，<br>有了CSS的`content`属性后可以当作一个DOM元素使用 </td><td> 2 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:after </td><td> 伪元素，在元素内容后边加内容，<br>有了CSS的`content`属性后可以当作一个DOM元素使用 </td><td> 2 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:first-letter </td><td> 文本内容的首字母 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:first-line </td><td> 文本内容的第一行 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td>__注意__ </td><td colspan="4"> 以上的伪元素都无法使用JS控制 </td></tr>
		<tr><td>::selection </td><td> 被选中的文本内容 </td><td> 3 </td><td> × </td><td> 9+</td></tr>
		<tr><td>:optional </td><td> 没有`required`的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
		<tr><td>:required </td><td> 有`required`的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
		<tr><td>:valid </td><td> `通过验证`的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
		<tr><td>:invalid </td><td> `未通过验证`的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
		<tr><td>:in-range </td><td> `在限制范围内`的所有`input[type="range"]`元素 </td><td> 3 </td><td> × </td><td> ×</td></tr>
		<tr><td>:out-of-range </td><td> `超出限制范围`的所有`input[type="range"]`元素 </td><td> 3 </td><td> × </td><td> ×</td></tr>
		<tr><td>:read-write </td><td> 没有`readonly`的所有表单控件 </td><td> 3 </td><td> × </td><td> ×</td></tr>
		<tr><td>:read-only </td><td> 有`readonly`的所有表单控件 </td><td> 3 </td><td> × </td><td> ×</td></tr>
	</tbody>
</table>