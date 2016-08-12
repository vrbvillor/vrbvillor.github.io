# CSS与JQuery的选择器对比

<table>
	<thead>
		<tr><td>选择器 </td><td> 含义 </td><td> CSS版本 </td><td> jQuery </td><td> IE版本</td></tr>
	</thead>
	<tbody>
		<tr><td>* </td><td> 所有元素 </td><td> 2 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>A </td><td> 标签名为<code>A</code>的所有元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>#A </td><td> <code>id</code>属性为<code>A</code>的一个元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>.A </td><td> <code>class</code>属性中含有<code>A</code>的所有元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>A,B </td><td> 符合<code>A或B</code>条件的所有元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>.A.B </td><td> <code>class</code>属性中<code>同时</code>含有<code>A及B</code>的所有元素 </td><td> 1 </td><td> √ </td><td> 7+</td></tr>
		<tr><td>A B </td><td> <code>A</code>任意级<code>后代</code>中的所有<code>B</code>元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
		<tr><td>A > B </td><td> <code>A</code>第<code>一代子级</code>中所有<code>B</code>元素 </td><td> 2 </td><td> √ </td><td> 7+</td></tr>
		<tr><td>A + B </td><td> <code>A</code>后<code>紧邻</code>的一个<code>B</code>元素 </td><td> 2 </td><td> √ </td><td> 7+</td></tr>
		<tr><td>A ~ B </td><td> <code>A</code>后<code>同级</code>的所有<code>B</code>元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A] </td><td> 含有<code>属性</code>名为<code>A</code>的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A="B"] </td><td> 属性<code>A</code>的值为<code>B</code>的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A|="B"] </td><td> 属性<code>A</code>中包含独立的单词<code>B</code>的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A~="B"] </td><td> 属性<code>A</code>中包含以<code>B</code>开头的单词的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A*="B"] </td><td> 属性<code>A</code>中包含<code>B</code>的所有元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A$="B"] </td><td> 属性<code>A</code>以<code>B</code>开头的所有元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A^="B"] </td><td> 属性<code>A</code>以<code>B</code>结尾的所有元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
		<tr><td>[A!="B"] </td><td> 属性<code>A</code>不等于<code>B</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:checked </td><td> 所有<code>被选中</code>的单/复选框 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:disabled </td><td> 所有<code>被禁用</code>的表单组件 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:empty </td><td> <code>无子元素</code>（伪元素不算）的所有空元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:parent </td><td> <code>有子元素</code>（伪元素不算）的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:enabled </td><td> 所有<code>可用</code>的表单组件 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:focus </td><td> <code>获得焦点</code>的表单组件 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:selected </td><td> <code>被选中</code>的所有option元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:root </td><td> 文档根元素（即html元素） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:target </td><td> 当前URL中<code>#</code>所对应的元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:first-child </td><td> 是其父元素的<code>第一子元素</code>的所有元素 </td><td> 2 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:first-of-type </td><td> 是<code>同标签名的同代元素</code>中<code>第一次出现</code>的所有元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:last-child </td><td> 是其父元素的<code>最后子元素</code>的所有元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:last-of-type </td><td> 是<code>同标签名的同代元素</code>中<code>最后一次出现</code>的所有元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:nth-child(n) </td><td> 在父元素中是第<code>n</code>个子元素的所有元素（可以使用公式<code>an+b</code>） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:nth-last-child(n) </td><td> 在父元素中是<code>倒数</code>第<code>n</code>个子元素的所有元素（可以使用公式<code>an+b</code>） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:nth-of-type(n) </td><td> 是<code>同标签名的同代元素</code>中第<code>n</code>个出现的所有元素（可以使用公式<code>an+b</code>） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:nth-last-of-type(n) </td><td> 是<code>同标签名的同代元素</code>中<code>倒数</code>第<code>n</code>个出现的所有元素（可以使用公式<code>an+b</code>） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
		<tr><td>:first </td><td> 集合中的第一个元素，不同于<code>:first-child</code> </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:last </td><td> 集合中的最后一个元素，不同于<code>:last-child</code> </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:eq(x) </td><td> 集合中的第<code>n</code>个元素（从<code>0</code>开始） </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:gt(x) </td><td> 集合中的第<code>n</code>个元素<code>之后</code>的元素（从<code>0</code>开始，不包括<code>n</code>） </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:lt(x) </td><td> 集合中的第<code>n</code>个元素<code>之前</code>的元素（从<code>0</code>开始，不包括<code>n</code>） </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:even </td><td> 集合中的所有<code>偶数</code>序号的元素（从<code>0</code>开始） </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:odd </td><td> 集合中的所有<code>奇数</code>序号的元素（从<code>0</code>开始） </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td><b>注意</b> </td><td colspan="4"> 使用<code>nth</code>系列可能不会得到预期的效果，尤其是在<code>nth</code>前边有其它选择器时 </td></tr>
		<tr><td>:only-child </td><td> 是其父元素中<code>唯一子元素</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:only-of-type </td><td> 是其父元素中<code>唯一标签子元素</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:button </td><td> <code>butotn</code>标签及<code>input[type="button"]</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:checkbox </td><td> <code>input[type="checkbox"]</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:file </td><td> <code>input[type="file"]</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:image </td><td> <code>input[type="image"]</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:input </td><td> <code>input[type="input"]</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:password </td><td> <code>input[type="password"]</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:radio </td><td> <code>input[type="radio"]</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:reset </td><td> <code>input[type="reset"]</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:submit </td><td> <code>input[type="submit"]</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:text </td><td> <code>input[type="text"]</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:contains(A) </td><td> <code>文本内容</code>中包含<code>A</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:has(A) </td><td> <code>后代元素</code>中包含<code>A</code>的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:header </td><td> 所有<code>h1</code>到<code>h6</code>元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:hidden </td><td> 所有<code>不可见</code>元素，包括<code>display:none</code>及<code>input[type="hidden"]</code> </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:visible </td><td> 所有<code>可见</code>元素，包括<code>visibility:hidden</code>及正常可见元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
		<tr><td>:link </td><td> 有<code>href</code>的所有<code>a</code>元素 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:visited </td><td> 历史记录中（被访问过的）的所有<code>a</code>元素 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:hover </td><td> 鼠标指向的元素（在IE6中只有<code>a</code>标签可以使用这个伪类） </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:active </td><td> 鼠标按下时所指向的元素（在IE6中只有<code>a</code>标签可以使用这个伪类） </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td><b>注意</b> </td><td colspan="4"> 在CSS中必须以<code>:link</code>-<code>:visited</code>-<code>:hover</code>-<code>:active</code>的顺序写才能保证所有这4个样式都有效 </td></tr>
		<tr><td>:before </td><td> 伪元素，在元素内容前边加内容，有了CSS的<code>content</code>属性后可以当作一个DOM元素使用 </td><td> 2 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:after </td><td> 伪元素，在元素内容后边加内容，有了CSS的<code>content</code>属性后可以当作一个DOM元素使用 </td><td> 2 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:first-letter </td><td> 文本内容的首字母 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td>:first-line </td><td> 文本内容的第一行 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
		<tr><td><b>注意</b> </td><td colspan="4"> 以上的伪元素都无法使用JS控制 </td></tr>
		<tr><td>::selection </td><td> 被选中的文本内容 </td><td> 3 </td><td> × </td><td> 9+</td></tr>
		<tr><td>:optional </td><td> 没有<code>required</code>的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
		<tr><td>:required </td><td> 有<code>required</code>的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
		<tr><td>:valid </td><td> <code>通过验证</code>的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
		<tr><td>:invalid </td><td> <code>未通过验证</code>的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
		<tr><td>:in-range </td><td> <code>在限制范围内</code>的所有<code>input[type="range"]</code>元素 </td><td> 3 </td><td> × </td><td> ×</td></tr>
		<tr><td>:out-of-range </td><td> <code>超出限制范围</code>的所有<code>input[type="range"]</code>元素 </td><td> 3 </td><td> × </td><td> ×</td></tr>
		<tr><td>:read-write </td><td> 没有<code>readonly</code>的所有表单控件 </td><td> 3 </td><td> × </td><td> ×</td></tr>
		<tr><td>:read-only </td><td> 有<code>readonly</code>的所有表单控件 </td><td> 3 </td><td> × </td><td> ×</td></tr>
	</tbody>
</table>