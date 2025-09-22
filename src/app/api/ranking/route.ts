import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';

export async function GET() {
  // Mock data mặc định
  const defaultLevelRanking = [
    { CharacterName: 'cuccut', Class: 'Dark Knight', cLevel: 400, Experience: 999999999 },
    { CharacterName: '1412', Class: 'Soul Master', cLevel: 400, Experience: 999999998 },
    { CharacterName: 'OneHit', Class: 'Muse Elf', cLevel: 400, Experience: 999999997 },
    { CharacterName: 'ProGamer', Class: 'Dark Knight', cLevel: 399, Experience: 999999996 },
    { CharacterName: 'MuMaster', Class: 'Soul Master', cLevel: 398, Experience: 999999995 }
  ];

  const defaultGuildRanking = [
    { GuildName: 'PLAYBOY', Points: 76, Logo: 'blue-red' },
    { GuildName: 'PkClear', Points: 44, Logo: 'red-black' },
    { GuildName: 'GameMast', Points: 38, Logo: 'yellow-orange' },
    { GuildName: 'DarkSide', Points: 32, Logo: 'black-red' },
    { GuildName: 'LightForce', Points: 28, Logo: 'blue-white' }
  ];

  const defaultEvents = [
    {
      EventName: 'Huyết Lâu',
      EventTime: '20:00',
      EventType: 'Blood Castle',
      Status: 'Active',
      Countdown: '1 giờ 43 phút 57 giây'
    },
    {
      EventName: 'Quảng Trường Quỷ',
      EventTime: '20:30',
      EventType: 'Devil Square',
      Status: 'Active',
      Countdown: '2 giờ 13 phút 57 giây'
    },
    {
      EventName: 'Hỗn Nguyên Lâu',
      EventTime: '19:00',
      EventType: 'Chaos Castle',
      Status: 'Active',
      Countdown: '43 phút 57 giây'
    },
    {
      EventName: 'Rồng đỏ',
      EventTime: '21:00',
      EventType: 'Red Dragon',
      Status: 'Active',
      Countdown: '2 giờ 43 phút 57 giây'
    },
    {
      EventName: 'Boss Vàng',
      EventTime: '21:30',
      EventType: 'Golden Boss',
      Status: 'Active',
      Countdown: '3 giờ 13 phút 57 giây'
    },
    {
      EventName: 'Phù thủy trắng',
      EventTime: '22:00',
      EventType: 'White Wizard',
      Status: 'Active',
      Countdown: '3 giờ 43 phút 57 giây'
    },
    {
      EventName: 'Boss Kundun',
      EventTime: '22:30',
      EventType: 'Kundun Boss',
      Status: 'Active',
      Countdown: '4 giờ 13 phút 57 giây'
    },
    {
      EventName: 'Boss Erohim',
      EventTime: '23:00',
      EventType: 'Erohim Boss',
      Status: 'Active',
      Countdown: '4 giờ 43 phút 57 giây'
    }
  ];

  try {
    const pool = await connectToDatabase();
    
    let levelRanking = defaultLevelRanking;
    let guildRanking = defaultGuildRanking;
    let events = defaultEvents;

    // Thử lấy dữ liệu thực từ database
    try {
      // Lấy top level ranking
      const levelResult = await pool.request().query(`
        SELECT TOP 10 
          CharacterName,
          Class,
          cLevel,
          Experience
        FROM Character 
        WHERE cLevel > 0
        ORDER BY cLevel DESC, Experience DESC
      `);

      if (levelResult.recordset.length > 0) {
        levelRanking = levelResult.recordset;
      }
    } catch {
      console.log('Character table not found or empty, using mock data');
    }

    try {
      // Lấy guild ranking
      const guildResult = await pool.request().query(`
        SELECT TOP 10 
          G_Name as GuildName,
          G_Score as Points,
          G_Mark as Logo
        FROM Guild 
        WHERE G_Score > 0
        ORDER BY G_Score DESC
      `);

      if (guildResult.recordset.length > 0) {
        guildRanking = guildResult.recordset;
      }
    } catch {
      console.log('Guild table not found or empty, using mock data');
    }

    try {
      // Lấy events
      const eventsResult = await pool.request().query(`
        SELECT 
          EventName,
          EventTime,
          EventType,
          Status,
          'Active' as Countdown
        FROM Events 
        WHERE Status = 'Active'
        ORDER BY EventTime ASC
      `);

      if (eventsResult.recordset.length > 0) {
        events = eventsResult.recordset;
      }
    } catch {
      console.log('Events table not found or empty, using mock data');
    }

    await pool.close();

    return NextResponse.json({
      success: true,
      data: {
        levelRanking,
        guildRanking,
        events
      }
    });

  } catch (error) {
    console.error('Ranking API error:', error);
    // Trả về mock data ngay cả khi có lỗi
    return NextResponse.json({
      success: true,
      data: {
        levelRanking: defaultLevelRanking,
        guildRanking: defaultGuildRanking,
        events: defaultEvents
      }
    });
  }
}
