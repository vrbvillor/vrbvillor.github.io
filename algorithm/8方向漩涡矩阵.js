/*
八个方向的漩涡矩阵
steps，方阵的阶数
bLeft，是否从左边开始
bTop，是否从上边开始
bVertical，第一次是否使用纵向排列
*/

function MATRIX(steps,bLeft,bTop,bVertical){
    var y=!!bLeft ? 0 : steps-1,
        x=!!bTop  ? 0 : steps-1,
        matrix=[],
        counter=0,
        mid=(steps-1)/2;
    bVertical=!!bVertical;
    bLeft=!!bLeft;
    bTop=!!bTop;

    for(var i=0;i<steps;i++)
    {
        matrix[i]=[];
        for(var j=0;j<steps;j++)
            matrix[i][j]="";
    }

    var bReverse=bLeft==bTop ? !bLeft : !!bLeft==bVertical,
        round=1,
        rounding=0;
    // alert(bReverse);

    while(counter<steps*steps){
        for(var n=0;n<steps-round*2+1;n++){
            matrix[x][y]=(counter<9 ? ' ':'')+(++counter);
            x+=bVertical ? bReverse ? -1 : 1 : 0;
            y+=bVertical ? 0 : bReverse ? -1 : 1;
        }
        x==y && (bReverse=!bReverse);
        bVertical=!bVertical;
        rounding++;
        rounding%4 || (
            x==y && (x+=(bReverse ? -1:1),y+=bReverse ? -1:1,true) || (x<y ? (x++,y--):(x--,y++)),
            round++
            // ,console.warn('next round',x,y,bVertical,bReverse)
        );
        if(x==y && x==mid || round>10){
            matrix[x][y]=(counter<9 ? ' ':'')+(++counter);
            break;
        }
    }

    for(var i=0;i<steps;i++){
        console.log(matrix[i].join(' ')+'\n');
    }
    console.log('--------------');
}

for(var n=0;n<8;n++){
    var str=n.toString(2);
    while(str.length<3){
        str='0'+str;
    }
    MATRIX(6,!!(str[0]*1),!!(str[1]*1),!!(str[2]*1));
}

