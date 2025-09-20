// Tests for reservations persistence
describe('Reservations persistence', function() {
  const KEY = 'pb_reservations_v1';

  beforeEach(function() {
    clearAppStorage();
  });

  it('should start empty', function() {
    const raw = localStorage.getItem(KEY);
    expect(raw).to.be.oneOf([null, undefined]);
  });

  it('should save and load a reservation', function() {
    const res = {
      id: 'r1',
      name: 'Test User',
      email: 'test@example.com',
      phone: '+521234567890',
      service: 'Corte',
      date: '2025-09-21T10:00:00',
      paid: false
    };

    // Save
    const arr = [res];
    localStorage.setItem(KEY, JSON.stringify(arr));

    // Load
    const loaded = JSON.parse(localStorage.getItem(KEY));
    expect(loaded).to.be.an('array').with.lengthOf(1);
    expect(loaded[0]).to.deep.equal(res);
  });

  it('should append multiple reservations and preserve order', function() {
    const a = { id: 'r1', name: 'A' };
    const b = { id: 'r2', name: 'B' };
    localStorage.setItem(KEY, JSON.stringify([a]));
    const current = JSON.parse(localStorage.getItem(KEY));
    current.push(b);
    localStorage.setItem(KEY, JSON.stringify(current));

    const loaded = JSON.parse(localStorage.getItem(KEY));
    expect(loaded.map(x => x.id)).to.eql(['r1', 'r2']);
  });
});
