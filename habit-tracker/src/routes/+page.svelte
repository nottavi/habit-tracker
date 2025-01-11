<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import type { Habit } from '$lib/types/habit';
  
  let habits: Habit[] = [];
  let newHabitTitle = '';
  let status = 'Chargement...';
  
  async function loadHabits() {
    try {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      habits = data;
      status = `${habits.length} habitudes chargées`;
    } catch (error: any) {
      status = `Erreur: ${error?.message || 'Inconnue'}`;
    }
  }
  
  async function addHabit() {
    try {
      const { data, error } = await supabase
        .from('habits')
        .insert([
          {
            title: newHabitTitle,
            frequency: 'daily',
            target_count: 1
          }
        ])
        .select();
        
      if (error) throw error;
      
      newHabitTitle = '';
      await loadHabits();
      status = 'Habitude ajoutée !';
    } catch (error: any) {
      status = `Erreur: ${error?.message || 'Inconnue'}`;
    }
  }
  
  onMount(() => {
    loadHabits();
  });
</script>

<div class="p-4">
  <h1 class="text-2xl font-bold mb-4">Test de Connexion Supabase</h1>
  
  <div class="mb-4">
    <p class="text-gray-600">{status}</p>
  </div>
  
  <div class="mb-4">
    <input
      type="text"
      bind:value={newHabitTitle}
      placeholder="Nouvelle habitude"
      class="border p-2 rounded"
    />
    <button
      on:click={addHabit}
      class="bg-indigo-600 text-white px-4 py-2 rounded ml-2"
    >
      Ajouter
    </button>
  </div>
  
  <ul class="space-y-2">
    {#each habits as habit}
      <li class="border p-2 rounded">
        {habit.title} ({habit.frequency})
      </li>
    {/each}
  </ul>
</div>
