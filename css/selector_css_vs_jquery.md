# CSS与JQuery的选择器对比

<table>
<tr>选择器 </td><td> 含义 </td><td> CSS版本 </td><td> jQuery </td><td> IE版本</td></tr>
<tr>------ </td><td> ---- </td><td> ------- </td><td> ------ </td><td> ------</td></tr>
<tr>* </td><td> 所有元素 </td><td> 2 </td><td> √ </td><td> 6+</td></tr>
<tr>A </td><td> 标签名为`A`的所有元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
<tr>\#A </td><td> `id`属性为`A`的一个元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
<tr>.A </td><td> `class`属性中含有`A`的所有元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
<tr>A,B </td><td> 符合`A或B`条件的所有元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
<tr>.A.B </td><td> `class`属性中`同时`含有`A及B`的所有元素 </td><td> 1 </td><td> √ </td><td> 7+</td></tr>
<tr>A B </td><td> `A`任意级`后代`中的所有`B`元素 </td><td> 1 </td><td> √ </td><td> 6+</td></tr>
<tr>A > B </td><td> `A`第`一代子级`中所有`B`元素 </td><td> 2 </td><td> √ </td><td> 7+</td></tr>
<tr>A + B </td><td> `A`后`紧邻`的一个`B`元素 </td><td> 2 </td><td> √ </td><td> 7+</td></tr>
<tr>A ~ B </td><td> `A`后`同级`的所有`B`元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
<tr>[A] </td><td> 含有`属性`名为`A`的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
<tr>[A="B"] </td><td> 属性`A`的值为`B`的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
<tr>[A\</td><td>="B"] </td><td> 属性`A`中包含独立的单词`B`的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
<tr>[A~="B"] </td><td> 属性`A`中包含以`B`开头的单词的所有元素 </td><td> 2 </td><td> √ </td><td> 8+</td></tr>
<tr>[A*="B"] </td><td> 属性`A`中包含`B`的所有元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
<tr>[A\$="B"] </td><td> 属性`A`以`B`开头的所有元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
<tr>[A^="B"] </td><td> 属性`A`以`B`结尾的所有元素 </td><td> 3 </td><td> √ </td><td> 8+</td></tr>
<tr>[A!="B"] </td><td> 属性`A`不等于`B`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:checked </td><td> 所有`被选中`的单/复选框 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:disabled </td><td> 所有`被禁用`的表单组件 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:empty </td><td> `无子元素`（伪元素不算）的所有空元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:parent </td><td> `有子元素`（伪元素不算）的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:enabled </td><td> 所有`可用`的表单组件 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:focus </td><td> `获得焦点`的表单组件 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:selected </td><td> `被选中`的所有option元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:root </td><td> 文档根元素（即html元素） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:target </td><td> 当前URL中`#`所对应的元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:first-child </td><td> 是其父元素的`第一子元素`的所有元素 </td><td> 2 </td><td> √ </td><td> 9+</td></tr>
<tr>:first-of-type </td><td> 是`同标签名的同代元素`中`<br>第一次出现`的所有元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:last-child </td><td> 是其父元素的`最后子元素`的所有元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:last-of-type </td><td> 是`同标签名的同代元素`中`<br>最后一次出现`的所有元素 </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:nth-child(n) </td><td> 在父元素中是第`n`个子元素<br>的所有元素（可以使用公式`an+b`） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:nth-last-child(n) </td><td> 在父元素中是`倒数`第`n`个<br>子元素的所有元素（可以使用公式`an+b`） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:nth-of-type(n) </td><td> 是`同标签名的同代元素`中<br>第`n`个出现的所有元素（可以使用公式`an+b`） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:nth-last-of-type(n) </td><td> 是`同标签名的同代元素`中`<br>倒数`第`n`个出现的所有元素（可以使用公式`an+b`） </td><td> 3 </td><td> √ </td><td> 9+</td></tr>
<tr>:first </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:last </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:eq(x) </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:gt(x) </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:lt(x) </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:even </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:odd </td><td> 所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>__注意__ </td><td> 使用`nth`系列可能不会得到预期的效果，尤其是在`nth`前边有其它选择器时 </td><td>  </td><td>  </td><td> </td></tr>
<tr>:only-child </td><td> 是其父元素中`唯一子元素`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:only-of-type </td><td> 是其父元素中`唯一标签子元素`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:button </td><td> `butotn`标签及`input[type="button"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:checkbox </td><td> `input[type="checkbox"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:file </td><td> `input[type="file"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:image </td><td> `input[type="image"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:input </td><td> `input[type="input"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:password </td><td> `input[type="password"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:radio </td><td> `input[type="radio"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:reset </td><td> `input[type="reset"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:submit </td><td> `input[type="submit"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:text </td><td> `input[type="text"]`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:contains(A) </td><td> `文本内容`中包含`A`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:has(A) </td><td> `后代元素`中包含`A`的所有元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:header </td><td> 所有`h1`到`h6`元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:hidden </td><td> 所有`不可见`元素，包括`display:none`及`input[type="hidden"]` </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:visible </td><td> 所有`可见`元素，包括`visibility:hidden`及正常可见元素 </td><td> × </td><td> √ </td><td> ×</td></tr>
<tr>:link </td><td> 有`href`的所有`a`元素 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
<tr>:visited </td><td> 历史记录中（被访问过的）的所有`a`元素 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
<tr>:hover </td><td> 鼠标指向的元素（在IE6中只有`a`标签可以使用这个伪类） </td><td> 1 </td><td> × </td><td> 6+</td></tr>
<tr>:active </td><td> 鼠标按下时所指向的元素（在IE6中只有`a`标签可以使用这个伪类） </td><td> 1 </td><td> × </td><td> 6+</td></tr>
<tr>__注意__ </td><td> 在CSS中必须以`:link`-`:visited`-`:hover`-`:active`<br>的顺序写才能保证所有这4个样式都有效 </td><td>  </td><td>  </td><td> </td></tr>
<tr>:before </td><td> 伪元素，在元素内容前边加内容，<br>有了CSS的`content`属性后可以当作一个DOM元素使用 </td><td> 2 </td><td> × </td><td> 6+</td></tr>
<tr>:after </td><td> 伪元素，在元素内容后边加内容，<br>有了CSS的`content`属性后可以当作一个DOM元素使用 </td><td> 2 </td><td> × </td><td> 6+</td></tr>
<tr>:first-letter </td><td> 文本内容的首字母 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
<tr>:first-line </td><td> 文本内容的第一行 </td><td> 1 </td><td> × </td><td> 6+</td></tr>
<tr>__注意__ </td><td> 以上的伪元素都无法使用JS控制 </td><td>  </td><td>  </td><td> </td></tr>
<tr>::selection </td><td> 被选中的文本内容 </td><td> 3 </td><td> × </td><td> 9+</td></tr>
<tr>:optional </td><td> 没有`required`的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
<tr>:required </td><td> 有`required`的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
<tr>:valid </td><td> `通过验证`的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
<tr>:invalid </td><td> `未通过验证`的所有表单控件 </td><td> 3 </td><td> × </td><td> 10+</td></tr>
<tr>:in-range </td><td> `在限制范围内`的所有`input[type="range"]`元素 </td><td> 3 </td><td> × </td><td> ×</td></tr>
<tr>:out-of-range </td><td> `超出限制范围`的所有`input[type="range"]`元素 </td><td> 3 </td><td> × </td><td> ×</td></tr>
<tr>:read-write </td><td> 没有`readonly`的所有表单控件 </td><td> 3 </td><td> × </td><td> ×</td></tr>
<tr>:read-only </td><td> 有`readonly`的所有表单控件 </td><td> 3 </td><td> × </td><td> ×</td></tr>
</table>