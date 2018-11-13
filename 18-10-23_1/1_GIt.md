### GIT
#### git 和 github
1. git: 版本控制工具
    - 版本控制(对代码版本的一个操作): 
        - A: #1
        - B: #2
            - 快速找到B项目的问题，修改后重新上线
            - 快速切到A项目上保证功能都没问题，下面再看B项目的BUG
2. github: 程序员“交友网站” ，远程的管理仓库
#### 版本控制工具: 
    - 集成式控制：svn 很依赖中央服务器，只要断电就不能进行版本控制，如果中央服务器挂了，数据会丢失， 网外的开发者不方便参与项目开发
    - 分布式控制：git 不依赖于中央服务器，每台计算机就是一个服务器，不需要网络就能够进行版本控制，如果跟github进行链接，功能会更强

#### git和github链接
    - ssh-keygen -t rsa -C "注册用的邮箱"; 获取链接码密钥
    - ssh -T git@github.com; 验证是否绑定

#### 创建项目:（能不能版本控制，关键是看有没有.git的文件）
    - 创建的方式: 
        - git init
        - 通过github创建项目的方式创建
            - 点击'+'号
            - 点第一个创建项目
            - 输入项目名，描述，勾选README
            - 点击确定
            - 打开想要克隆到的目录
            - 打开git-base 输入git clone 项目地址（shift + insert）

#### 杂项: 
    - 进入盘符
        - cd c:
    - 进入文件夹
        - cd 文件夹的名字
    - 回退目录
        - cd ..
    - 查看当前目录下有什么
        - ll或者ls
    - 输入一些关键字按tab键自动补全
#### 命令:
    - 查看状态
        - git status
    - 从工作区到暂存区
        - git add 文件的名字
        - git add . 多个文件时全部保存到暂存区
    - 从暂存区到版本区
        - git commit -m "注释" (注释主要是为了方便管理员查找和操作)
    - 快速从工作区但版本区
        - (前提是已经添加过到版本去) git commit -a -m "注释"
    - 从版本区的文件传到远程仓库
        - 默认： git push origin master
    - 查看版本信息： git log
    - 查看每个区域之间的差异
        - 工作区查与暂存区： git diff
        - 暂存区查与版本区： git diff --cached
        - 工作区查与版本区： git diff master
    - 设置贡献者信息
        - git config --global user.name "用户名"
        - git config --global user.email "邮箱"
    - 版本回退
        - git reset --hard 版本id
        - 获取版本id
            - git log 或者 git reflog
    - 永久免密
        - git config --global creadential.helper store