import { server } from '#src/server';
import { PORT } from '#src/config/config';
import DataBase from '#src/database/db';
import '#src/database/associatons/associations';

(async function main() {
  const db = DataBase.getInstance();
  try {
    await db.getConnection().sync({ force: true });
    server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  } catch (error) {
    console.error(error);
    db.getConnection().close();
  }
})();