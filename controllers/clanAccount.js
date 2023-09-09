// Form route handlers
app.get('/form', async (req, res) => {
    // Fetch clan head
    const clanHead = await ClanHead.findOne(); 
    
    // Render form view
    res.render('form', { clanHead }); 
  });
  
  app.post('/form', async (req, res) => {
  
    // Create clan head
    const clanHead = new ClanHead(req.body);
    await clanHead.save();
  
    // Create descendants
    req.body.descendants.forEach(async (descendant) => {
      const newDescendant = new Descendant(descendant);
      newDescendant.clanHead = clanHead;
      await newDescendant.save(); 
    });
  
    res.redirect('/success');
  });

  // History CRUD
  // Notable memebers CRUD
  // traditions CRUD
  // CLAN LINEAGE CRUD
  // Media Gallery CRUD
  // Profile CRUD
  // Settings and Billing CRUD
