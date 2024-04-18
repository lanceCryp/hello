# -*- coding:utf-8 -*-


def get_inverse(value, p):
    """
    求逆元
    :param value: 待求逆元的值
    :param p: 模数
    """
    for i in range(1, p):
        if (i * value) % p == 1:
            return i
    return -1


def get_gcd(value1, value2):
    """
    辗转相除法求最大公约数
    :param value1:
    :param value2:
    """
    if value2 == 0:
        return value1
    else:
        return get_gcd(value2, value1 % value2)


def get_PaddQ(x1, y1, x2, y2, a, p):
    """
    计算P+Q
    :param x1: P点横坐标
    :param y1: P点纵坐标
    :param x2: Q点横坐标
    :param y2: Q点纵坐标
    :param a: 曲线参数
    :param p: 曲线模数
    """
    flag = 1  # 定义符号位(+/-)

    # 如果P=Q，斜率k=(3x^2+a)/2y mod p
    if x1 == x2 and y1 == y2:
        member = 3 * (x1 ** 2) + a  # 分子
        denominator = 2 * y1  # 分母

    # 如果P≠Q， 斜率k=(y2-y1)/(x2-x1) mod p
    else:
        member = y2 - y1
        denominator = x2 - x1

        if member * denominator < 0:
            flag = 0  # 表示负数
            member = abs(member)
            denominator = abs(denominator)

    # 化简分子分母
    gcd = get_gcd(member, denominator)  # 最大公约数
    member = member // gcd
    denominator = denominator // gcd
    # 求分母的逆元
    inverse_deno = get_inverse(denominator, p)
    # 求斜率
    k = (member * inverse_deno)
    if flag == 0:
        k = -k
    k = k % p

    # 计算P+Q=(x3,y3)
    x3 = (k ** 2 - x1 - x2) % p
    y3 = (k * (x1 - x3) - y1) % p

    return x3, y3


def get_order(x0, y0, a, b, p):
    """
    计算椭圆曲线的阶
    """
    x1 = x0  # -P的横坐标
    y1 = (-1 * y0) % p  # -P的纵坐标
    temp_x = x0
    temp_y = y0
    n = 1
    while True:
        n += 1
        # 累加P,得到n*P=0∞
        xp, yp = get_PaddQ(temp_x, temp_y, x0, y0, a, p)
        # 如果(xp,yp)==-P，即(xp,yp)+P=0∞，此时n+1为阶数
        if xp == x1 and yp == y1:
            return n + 1
        temp_x = xp
        temp_y = yp


def get_dot(x0, a, b, p):
    """
    计算P和-P
    """
    y0 = -1
    for i in range(p):
        # 满足适合加密的椭圆曲线条件，Ep(a,b)，p为质数，x,y∈[0,p-1]
        if i ** 2 % p == (x0 ** 3 + a * x0 + b) % p:
            y0 = i
            break
    # 如果找不到合适的y0返回False
    if y0 == -1:
        return False
    # 计算-y
    x1 = x0
    y1 = (-1 * y0) % p
    return x0, y0, x1, y1


def get_graph(a, b, p):
    """
    画出椭圆曲线散点图
    """
    xy = []
    # 初始化二维数组
    for i in range(p):
        xy.append(['-' for i in range(p)])

    for i in range(p):
        value = get_dot(i, a, b, p)
        if value is not False:
            x0, y0, x1, y1 = value
            xy[x0][y0] = 1
            xy[x1][y1] = 1

    print('椭圆曲线散点图：')
    for i in range(p):
        temp = p - 1 - i
        if temp >= 10:
            print(temp, end='')
        else:
            print(temp, end='')

        # 输出具体坐标值
        for j in range(p):
            print(xy[j][temp], end='')
        print()

    print(' ', end='')
    for i in range(p):
        if i >= 10:
            print(i, end='')
        else:
            print(i, end='')

    print()


def get_nG(xG, yG, priv_key, a, p):
    """
    计算nG
    """
    temp_x = xG
    temp_y = yG
    while priv_key != 1:
        temp_x, temp_y = get_PaddQ(temp_x, temp_y, xG, yG, a, p)
        priv_key -= 1
    return temp_x, temp_y


def get_KEY():
    """
    生成公钥私钥
    """
    # 选择曲线方程
    while True:
        a = int(input('输入椭圆曲线参数a（a>0）的值：'))
        b = int(input('输入椭圆曲线参数b（b>0）的值：'))
        p = int(input('输入椭圆曲线参数p（p为素数）的值：'))

        # 满足曲线判别式
        if (4 * (a ** 3) + 27 * (b ** 2)) % p == 0:
            print('输入的参数有误，请重新输入！\n')
        else:
            break

    # 输出曲线散点图
    get_graph(a, b, p)

    # 选择基点G
    print('在上图坐标系中选择基点G的坐标')
    xG = int(input('横坐标xG：'))
    yG = int(input('纵坐标yG：'))

    # 获取曲线的阶
    n = get_order(xG, yG, a, b, p)

    # 生成私钥key，且key<n
    priv_key = int(input('输入私钥key(<%d)：' % n))
    # 生成公钥KEY
    xK, yK = get_nG(xG, yG, priv_key, a, p)
    return xK, yK, priv_key, a, b, p, n, xG, yG


def encrypt(xG, yG, xK, yK, priv_key, a, p, n):
    """
    加密
    """
    k = int(input('输入一个整数k(<%d)用于计算kG和kQ：' % n))
    kGx, kGy = get_nG(xG, yG, priv_key, a, p)  # kG
    kQx, kQy = get_nG(xK, yK, priv_key, a, p)  # kQ
    plain = input('输入需要加密的字符串：')
    plain = plain.strip()
    c = []
    print('密文为：', end='')
    for char in plain:
        intchar = ord(char)
        cipher = intchar * kQx
        c.append([kGx, kGy, cipher])
        print('(%d,%d),%d' % (kGx, kGy, cipher), end=' ')

    print()
    return c


def decrypt(c, priv_key, a, p):
    """
    解密
    """
    for charArr in c:
        kQx, kQy = get_nG(charArr[0], charArr[1], priv_key, a, p)
        print(chr(charArr[2] // kQx), end='')
    print()


if __name__ == '__main__':
    xK, yK, priv_key, a, b, p, n, xG, yG = get_KEY()
    c = encrypt(xG, yG, xK, yK, priv_key, a, p, n)
    decrypt(c, priv_key, a, p)